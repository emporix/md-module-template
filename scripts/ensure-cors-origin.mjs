import { readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { createInterface } from 'node:readline/promises'
import { fileURLToPath } from 'node:url'
import { stdin as input, stdout as output } from 'node:process'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const viteConfigPath = resolve(rootDir, 'vite.config.ts')
const DEFAULT_ORIGIN = 'https://admin.emporix.io'

const getArg = (name) => {
  const index = process.argv.indexOf(name)
  if (index < 0) {
    return undefined
  }
  return process.argv[index + 1]
}

const parseEnvFile = (content) => {
  const values = {}
  for (const line of content.split(/\r?\n/)) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) {
      continue
    }
    const separator = trimmed.indexOf('=')
    if (separator < 0) {
      continue
    }
    const key = trimmed.slice(0, separator).trim()
    let value = trimmed.slice(separator + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    values[key] = value
  }
  return values
}

const loadEnvValue = async (mode, key) => {
  const candidates = [
    mode ? resolve(rootDir, `.env.${mode}`) : null,
    resolve(rootDir, '.env'),
  ].filter(Boolean)

  for (const filePath of candidates) {
    try {
      const content = await readFile(filePath, 'utf8')
      const value = parseEnvFile(content)[key]
      if (value) {
        return value
      }
    } catch (error) {
      if (error && typeof error === 'object' && 'code' in error && error.code === 'ENOENT') {
        continue
      }
      throw error
    }
  }

  return undefined
}

const parseOriginList = (listSource) => {
  const origins = []
  const stringLiteral = /(['"])(.*?)\1/g
  let match = stringLiteral.exec(listSource)
  while (match) {
    origins.push(match[2])
    match = stringLiteral.exec(listSource)
  }
  return origins
}

const findCorsOrigins = (configSource) => {
  const sharedArray = configSource.match(
    /(?:const|let|var)\s+corsOrigins\s*=\s*\[([\s\S]*?)\]/
  )
  if (sharedArray) {
    return {
      kind: 'shared',
      origins: parseOriginList(sharedArray[1]),
      match: sharedArray,
    }
  }

  const inlineArrays = [...configSource.matchAll(/origin:\s*\[([\s\S]*?)\]/g)]
  if (inlineArrays.length === 0) {
    return null
  }

  return {
    kind: 'inline',
    origins: [...new Set(inlineArrays.flatMap((entry) => parseOriginList(entry[1])))],
    matches: inlineArrays,
  }
}

const formatOriginList = (origins, indent) =>
  origins.map((origin) => `${indent}'${origin}'`).join(',\n')

const addOriginToConfig = (configSource, origin, corsInfo) => {
  if (corsInfo.kind === 'shared') {
    const nextOrigins = [...corsInfo.origins, origin]
    const body = formatOriginList(nextOrigins, '  ')
    return configSource.replace(
      corsInfo.match[0],
      nextOrigins.length === 1
        ? `const corsOrigins = [${body}]`
        : `const corsOrigins = [\n${body},\n]`
    )
  }

  let updated = configSource
  for (const match of [...corsInfo.matches].reverse()) {
    const current = parseOriginList(match[1])
    if (current.includes(origin)) {
      continue
    }
    const nextOrigins = [...current, origin]
    const body = formatOriginList(nextOrigins, '        ')
    const replacement =
      nextOrigins.length === 1
        ? `origin: [${body}]`
        : `origin: [\n${body},\n      ]`
    updated =
      updated.slice(0, match.index) + replacement + updated.slice(match.index + match[0].length)
  }
  return updated
}

const askToAdd = async (origin) => {
  if (!input.isTTY || !output.isTTY) {
    console.error(
      [
        `CORS check failed: "${origin}" is not in vite.config.ts whitelist.`,
        'Re-run this command in an interactive terminal to add it, or edit vite.config.ts manually.',
      ].join('\n')
    )
    return false
  }

  const rl = createInterface({ input, output })
  try {
    const answer = await rl.question(
      `"${origin}" is not in the CORS whitelist.\nAdd it to vite.config.ts? [y/N] `
    )
    return ['y', 'yes'].includes(answer.trim().toLowerCase())
  } finally {
    rl.close()
  }
}

const main = async () => {
  const mode = getArg('--mode') ?? 'prod'
  const origin =
    process.env.CORS_ORIGIN ??
    (await loadEnvValue(mode, 'VITE_DASHBOARD_ORIGIN')) ??
    DEFAULT_ORIGIN

  const configSource = await readFile(viteConfigPath, 'utf8')
  const corsInfo = findCorsOrigins(configSource)

  if (!corsInfo) {
    console.error('Could not find CORS origin list in vite.config.ts')
    process.exit(1)
  }

  if (corsInfo.origins.includes(origin)) {
    console.info(`CORS check passed: "${origin}" is whitelisted.`)
    return
  }

  console.error(`CORS check failed: "${origin}" is not whitelisted (mode: ${mode}).`)

  const shouldAdd = await askToAdd(origin)
  if (!shouldAdd) {
    process.exit(1)
  }

  const updated = addOriginToConfig(configSource, origin, corsInfo)
  await writeFile(viteConfigPath, updated, 'utf8')
  console.info(`Added "${origin}" to CORS whitelist in vite.config.ts. Continuing build.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})

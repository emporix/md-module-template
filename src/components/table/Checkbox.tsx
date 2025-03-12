import { RefObject, forwardRef, InputHTMLAttributes, useEffect, useRef } from 'react'

export const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  { indeterminate?: boolean } & InputHTMLAttributes<HTMLInputElement>
>(({ indeterminate, className = '', ...rest }, ref) => {
  const defaultRef = useRef<HTMLInputElement>(null)
  const resolvedRef = ref || defaultRef

  useEffect(() => {
    if (typeof resolvedRef === 'object' && resolvedRef.current) {
      resolvedRef.current.indeterminate = indeterminate ?? false
    }
  }, [resolvedRef, indeterminate])

  return (
    <input
      type="checkbox"
      ref={resolvedRef as RefObject<HTMLInputElement>}
      className={`cursor-pointer appearance-none w-4 h-4 border border-gray-300 bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left focus:ring-0 focus:ring-offset-0 ${className}`}
      {...rest}
    />
  )
})

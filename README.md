# Emporix extension module

## Introduction

This is a module template designed for the Emporix platform. It is a React application that is built with Vite. It is based on the module federation concept described in [vite-plugin-deferation](https://github.com/originjs/vite-plugin-federation) repository.

This implementation is a simple example of a module built for most common use cases.

The main goal was to provide a minimal setup for a module that can be used as a starting point for more complex modules.

## Development

### Prerequisites
To get started, install the dependencies:

```bash
npm install
```

### Testing module

To test it locally with the Emporix Management Dashboard, build the project:

#### Development enviroment
```bash
npm run build:dev
```

#### Staging enviroment
```bash
npm run build:stage
```
#### Production enviroment
```bash
npm run build
```

and then start the local server:
```bash
npm run preview
```

You also need to add the module to the Management Dashboard:
- open the Dashboard
- go to `Administration/Extensions` page
- click `ADD NEW EXTENSION` button
- provide the name of the module
- enable module 
- provide the URL to the `remoteEntry.js` file (`http://localhost:4173/remoteEntry.js`)
- add package name for the module (e.g. `orders-module`)

You can find the Management Dashboard extensions documentation at [Administration - Extension Guides](https://developer.emporix.io/user-guides/management-dashboard/administration/extensions) and [Management Dashboard - Extension Guides](https://developer.emporix.io/user-guides/management-dashboard/extensions/extensions).

### Deploying

In order to use the module in the Emporix Management Dashboard, deploy it to a hosting service and then provide the URL to the `remoteEntry.js` in the Emporix Management Dashboard.

App hosting should have CORS set up to allow the module to be loaded from emporix domain.
Example of CORS configuration for Firebase hosting:

```json
{
  "hosting": {
    "public": "dist",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "headers": [
      {
        "source": "**",
        "headers": [
          {
            "key": "Access-Control-Allow-Origin",
            "value": "*"
          }
        ]
      }
    ]
  }
}
```

### Testing standalone module
This project can be run locally outside of Management Dashboard using the following command:

#### Development enviroment
```bash
npm run dev
```
#### Staging enviroment
```bash
npm run dev:stage
```

You will be requested to provide app context on the start:
- tenant name
- auth token (JWT token)
- language  ('en' or 'de')

## Customizing the module

This module template uses [PrimeReact](https://www.primefaces.org/primereact-v8) for UI components and [PrimeFlex](https://primeflex.org) for styling.
But, the default styling is inherited from the Management Dashboard.

You are free to use your own UI libraries or styling.
If so, you can remove PrimeReact and PrimeFlex from the package.json file.
```bash
    "chart.js": "^4.4.7",
    "primeflex": "^3.1.3",
    "primeicons": "^6.0.0",
    "primereact": "^8.7.0",
    "quill": "^2.0.3",
```
Then remove import statements from the `App.tsx` file:
```bash
import RemoteComponent from './RemoteComponent'
import { Button, Card, InputText } from 'primereact'
import 'primereact/resources/themes/lara-light-indigo/theme.css' //theme
import 'primereact/resources/primereact.min.css' //core css
import 'primeicons/primeicons.css'
```
and all occurrences in the component.

and also from `RemoteComponent.tsx` file remove:
```bash
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'
```

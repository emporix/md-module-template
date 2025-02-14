# Emporix module

## Intrudoction

This is a module template for the Emporix platform. It is a React application that is built with Vite. It is based on module federation concept descirbed here: https://github.com/originjs/vite-plugin-federation

This implemetation is also a simple example of a module with most common use cases

The main goal was to provide a minimal setup for a module that can be used as a starting point for a new module.

## Development

### Prerequisites
To get started, you need to install the dependencies:

```bash
npm install
```

### Testing module

To test it locally with Emporix Managment Dashboard you need to build the project:

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

and then start local server:
```bash
npm run preview
```

You also need to add the module to Dashboard:
- open the Dashboard
- go to `Administration/Extensions` page
- click `ADD NEW EXTENSION` button
- provide the name of the module
- enable module 
- provide the URL to the `remoteEntry.js` file (`http://localhost:4173/remoteEntry.js`)
- add package name for the module (e.g. `orders-module`)

### Deploying

In order to use the module in Emporix Managment Dashboard, you need to deploy it to a hosting service and then provide the URL to the `remoteEntry.js` in the Emporix Managment Dashboard.

### Testing standalone module
This project can be run locally outside of Managment Dashboard using following command:
#### Development enviroment
```bash
npm run dev
```
#### Staging enviroment
```bash
npm run dev:stage
```

You will be requested to provide app context on start:
- tenant name
- auth token (JWT token)
- language  ('en' or 'de')

## Customizing the module

This module tempalte uses PrimeReact (https://www.primefaces.org/primereact-v8) for UI components and PrimeFlex
(https://primeflex.org) for styling

Default styling is inherited from Managment Dashboard.

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
and all occurances in the component.

and also from `RemoteComponent.tsx` file remove:
```bash
import '/node_modules/primeflex/primeflex.css'
import 'primeicons/primeicons.css'
```

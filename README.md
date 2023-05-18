# React Component Indexer

[![npm version](https://badge.fury.io/js/react-component-indexer.svg)](https://www.npmjs.com/package/react-component-indexer)
[![License](https://img.shields.io/badge/license-GNU-blue.svg)](https://github.com/ronaldjdev/react-component-indexer)



El React Component Indexer es un paquete de utilidades para indexar y gestionar componentes en una aplicación de React.

## Features

- Indexa y organiza los componentes de tu aplicación de React de forma eficiente.
<!-- Proporciona una API sencilla para buscar, filtrar y acceder a los componentes indexados.
- Soporta múltiples formas de indexar componentes, como por nombre, ruta, etiquetas, etc.-->
- Puede ser utilizado tanto en aplicaciones de React creadas con Create React App como en proyectos personalizados.

## Install

Para instalar el React Component Indexer, utiliza npm o yarn:

```shell
#npm
npm install react-component-indexer
```
```shell
#yarn
yarn add react-component-indexer
```
## Config
Con esta configuacion abreviamos el path de importacion ej:
```js
//before
import { XXX } from "../../components/Example"
//after
import { XXX } from "components/Example"
```
- Crear archivo **jsconfig.json** e inserta:
```json
{
    "compilerOptions": {
      "target": "es6",
      "module": "commonjs",
      "baseUrl": "src"
    },
    "include": [
      "src/**/*"
    ],
    "exclude": [
      "node_modules"
    ]
  }
  ``` 
- Si usas **vitejs**, en el archivo de de configuracion de vite, **vite.config.js** inserta:
```js 
import jsconfigPaths from 'vite-jsconfig-paths'

export default defineConfig({
  plugins: [
    jsconfigPaths(),
  ]
})
```
- En el archivo **package.json** insertar el script:
```json
  "scripts": {
    "indexer": "node node_modules/react-component-indexer/src/export.js"
  },
```
## Usage
Los nombres de los componentes y funciones que contienen deben ser iguales ej:
```js
// MiComponente.jsx

function MiComponente() {
  return (
    <div>
      {/* Contenido del componente */}
    </div>
  );
}

export default MiComponente;

```
- Ejecuta el comando npm run indexer o yarn indexer en la línea de comandos.
```shell
#npm
npm run indexer
```
```shell
#yarn
yarn indexer
```
- Aparecerá un mensaje solicitando que ingreses el nombre del directorio que deseas indexar.
```shell
#inserta el nombre de la carpeta que quieres indexar
Inserta el nombre del directorio a indexar:
```
- Aparecerá un mensaje indicando que los componentes se han indexado correctamente.
```shell
#crea un archivo index.js en la carpeta seleccionada
Componentes indexados corretamente!
```


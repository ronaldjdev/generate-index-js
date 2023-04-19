// import { createInterface } from 'readline'
// import { readdirSync, statSync, writeFileSync } from 'fs'
// import { join } from 'path'

// const rl = createInterface({
//   input: process.stdin,
//   output: process.stdout,
// })

// const isDirectory = source => statSync(source).isDirectory()
// const getDirectories = source =>
//   readdirSync(source)
//     .map(name => join(source, name))
//     .filter(isDirectory)

// const traverseDirectory = dirPath => {
//   const components = []
//   const files = readdirSync(dirPath)

//   files.forEach(file => {
//     const filePath = join(dirPath, file)

//     if (isDirectory(filePath)) {
//       components.push(...traverseDirectory(filePath))
//     }
//     if (filePath.endsWith('.jsx') || filePath.endsWith('.tsx')) {
//       const componentName = file.replace('.jsx', '') || file.replace('.tsx', '')
//       const componentPath =
//         filePath.replace('.jsx', '') || filePath.replace('.tsx', '')
//       components.push({
//         name: componentName,
//         path: componentPath,
//       })
//     }
//     // if (filePath.endsWith('.js') || filePath.endsWith('.ts')) {
//     //   const componentName = file.replace('.js', '') || file.replace('.ts', '')
//     //   const componentPath = filePath
//     //     // filePath.replace('.js', '') || filePath.replace('.ts', '')
//     //   components.push({ name: componentName, path: componentPath })
//     // }
//   })

//   return components
// }

// rl.question('Por favor, ingresa el nombre de la carpeta a procesar: ', dir => {
//   const components = traverseDirectory(`./src/${dir}`)
//   const routes = components.map(item => ({
//     ...item,
//     path: item.path.replace('src/', '').replace(/\\/g, '/'),
//   }))
//   const content = routes
//     .map(({ name, path }) => `export { ${name} } from '${path}'`)
//     .join('\n')
//   console.log(content)

//   writeFileSync(`./src/${dir}/index.js`, content, { flag: 'w' })

//   console.log(`¡Se ha generado el archivo index.js para la carpeta ${dir}!`)

//   rl.close()
// })


const readline = require('readline')
const fs = require('fs')
const path = require('path')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const isDirectory = source => fs.statSync(source).isDirectory()
const getDirectories = source =>
  fs.readdirSync(source)
    .map(name => path.join(source, name))
    .filter(isDirectory)

const traverseDirectory = dirPath => {
  const components = []
  const files = fs.readdirSync(dirPath)

  files.forEach(file => {
    const filePath = path.join(dirPath, file)

    if (isDirectory(filePath)) {
      components.push(...traverseDirectory(filePath))
    }
    if (filePath.endsWith('.jsx') || filePath.endsWith('.tsx')) {
      const componentName = file.replace('.jsx', '') || file.replace('.tsx', '')
      const componentPath =
        filePath.replace('.jsx', '') || filePath.replace('.tsx', '')
      components.push({
        name: componentName,
        path: componentPath,
      })
    }
    // if (filePath.endsWith('.js') || filePath.endsWith('.ts')) {
    //   const componentName = file.replace('.js', '') || file.replace('.ts', '')
    //   const componentPath = filePath
    //     // filePath.replace('.js', '') || filePath.replace('.ts', '')
    //   components.push({ name: componentName, path: componentPath })
    // }
  })

  return components
}

rl.question('Por favor, ingresa el nombre de la carpeta a procesar: ', dir => {
  const components = traverseDirectory(`./src/${dir}`)
  const routes = components.map(item => ({
    ...item,
    path: item.path.replace('src/', '').replace(/\\/g, '/'),
  }))
  const content = routes
    .map(({ name, path }) => `export { ${name} } from '${path}'`)
    .join('\n')
  console.log(content)

  fs.writeFileSync(`./src/${dir}/index.js`, content, { flag: 'w' })

  console.log(`¡Se ha generado el archivo index.js para la carpeta ${dir}!`)

  rl.close()
})

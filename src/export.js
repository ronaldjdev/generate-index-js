
    // if (filePath.endsWith('.js') || filePath.endsWith('.ts')) {
    //   const componentName = file.replace('.js', '') || file.replace('.ts', '')
    //   const componentPath = filePath
    //     // filePath.replace('.js', '') || filePath.replace('.ts', '')
    //   components.push({ name: componentName, path: componentPath })
    // }

const readline = require('readline')
const fs = require('fs')
const path = require('path')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})
let extTsx = false
let extJsx = false

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

        //* Comprueba si la ruta de archivo es un directorio

        if (isDirectory(filePath)) {
          components.push(...traverseDirectory(filePath))
        }

        if (filePath.endsWith('.jsx')) {
          extJsx = true 
          const componentName = file.replace('.jsx', '')
          const componentPath = filePath.replace('.jsx', '')
    
          let isDefaultExport = false // Inicializar la variable en falso
          
          const content = fs.readFileSync(filePath, 'utf8')
          const lines = content.split('\n')
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim()
            if (line.startsWith('export default ')) {
              isDefaultExport = true // Si encuentra la exportación por defecto, setea la variable a verdadero
              break // Sale del loop porque ya encontró la exportación por defecto
            }
          }
    
          components.push({
            name: componentName,
            path: componentPath,
            isDefaultExport, // Agregar la propiedad isDefaultExport al objeto
          })
        }

        if (filePath.endsWith('.tsx')) {
          extTsx = true 
          const componentName = file.replace('.tsx', '')
          const componentPath =  filePath.replace('.tsx', '')
    
          let isDefaultExport = false // Inicializar la variable en falso
          
          const content = fs.readFileSync(filePath, 'utf8')
          const lines = content.split('\n')
          
          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim()
            if (line.startsWith('export default ')) {
              isDefaultExport = true // Si encuentra la exportación por defecto, setea la variable a verdadero
              break // Sale del loop porque ya encontró la exportación por defecto
            }
          }
    
          components.push({
            name: componentName,
            path: componentPath,
            isDefaultExport, // Agregar la propiedad isDefaultExport al objeto
          })
        }
    
      })
    
      return components
    }
    

rl.question('Por favor, ingresa el nombre de la carpeta a procesar: ', dir => {
  const components = traverseDirectory(`./src/${dir}`)
  const routes = components.map(item => ({
    ...item,
    path: item.path.replace('src/', '').replace(/\\/g, '/'),
  }))
  // Generar la cadena de exportación de cada componente
const content = routes
.map(({ name, path, isDefaultExport }) => {
  const exportName = isDefaultExport ? 'default as '+name : name
  return `export { ${exportName} } from '${path}'`
})
.join('\n')
  // const content = routes
  //   .map(({ name, path }) => `export { ${name} } from '${path}'`)
  //   .join('\n')
  console.log(content)
  let _path = extTsx ? `./src/${dir}/index.ts` : `./src/${dir}/index.js`
  fs.writeFileSync(_path, content, { flag: 'w' })

  console.log(`¡Se ha generado el archivo index para la carpeta ${dir}!`)

  rl.close()
})



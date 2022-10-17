const fs = require('fs')
const path = require('path')

// Find all files in the public directory and subdirectories
const publicDir = path.join(__dirname, 'public')
const publicFiles = fs.readdirSync(publicDir, { withFileTypes: true }).reduce((files, file) => {
  if (file.isDirectory()) {
    const dirFiles = fs.readdirSync(path.join(publicDir, file.name))
    return files.concat(dirFiles.map((f) => path.join(file.name, f)))
  } else {
    return files.concat(file.name)
  }
}, [])

// List all files that contain an underscore
const underscoreFiles = publicFiles.filter((file) => file.includes('_'))

if (underscoreFiles.length > 0) {
  console.log('The following files contain an underscores:')
  console.log(underscoreFiles)
  console.log('Please rename them and their reference to remove the underscore.')
  process.exit(1)
}

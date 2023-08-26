#!/usr/bin/env node
const { readdirSync, writeFileSync } = require('fs')

const args = process.argv.slice(2)

if (args.length === 0) {
  throw new Error('Please provide a path to a directory')
}

const [currentDirectoryPath] = args
const files = readdirSync(currentDirectoryPath)

let barrelFileContent = ``

files.forEach((file) => {
  const [fileName, fileExtension] = file.split('.')

  if (!fileExtension || fileExtension === 'ts' || fileExtension === 'tsx') {
    const fileContent = `export * from './${fileName}'`
    barrelFileContent += `${fileContent}\n`
  }

  writeFileSync(`${currentDirectoryPath}/index.ts`, barrelFileContent)
})

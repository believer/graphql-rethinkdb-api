import readFile from 'fs-readfile-promise'
import glob from 'glob-promise'

const getFiles = (files) =>
  Promise
    .all(files.map(file => readFile(file, 'utf-8')))
    .then(fileArray => fileArray.join())

export default (pattern) =>
  glob(pattern)
    .then(getFiles)
    .catch((err) => {
      throw err
    })

const fs = require('fs');

const checkFileExists = (path, timeLeft = 30000) => {
  const delay = 100
  return new Promise((resolve, reject) => {
    if (timeLeft < 0) {
      return reject(new Error(`File ${path} not found`))
    }
    if (fs.existsSync(path)) {
      return resolve('File exists')
    }
    setTimeout(() => {
      checkFileExists(path, timeLeft - delay).then(resolve, reject)
    }, delay)
  })
}

const deleteFile = (path, failOnNotExists = false) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, err => {
      if (err && failOnNotExists) reject(`Unable to delete ${path}`)
      resolve(true)
    })
  })
}

module.exports = {
  checkFileExists, deleteFile
}
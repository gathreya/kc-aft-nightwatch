const AWS = require('aws-sdk')
const fs = require('fs')

const S3 = new AWS.S3({
  region: 'us-west-2'
})

const saveToS3 = (sourcePath, destinationPath) => {
  const sourceStream = fs.createReadStream(sourcePath)
  return S3.putObject({
    Bucket: 'res-pdf-dev',
    Key: destinationPath,
    Body: sourceStream,
    ACL: 'public-read'
  }).promise()
}

const getFromS3 = (sourcePath, destinationPath) =>
  new Promise((resolve, reject) => {
    const destinationStream = fs.createWriteStream(destinationPath)
    let error = null
    const s3Stream = S3.getObject({
      Bucket: 'res-pdf-dev',
      Key: sourcePath
    }).createReadStream()
    s3Stream.on('error', err => {
      error = err
      resolve(false)
    })
    s3Stream.pipe(destinationStream)
      .on('error', err => {
        error = err
        resolve(false)
      })
      .on('close', () => {
        if (!error) resolve(true)
      })
  })



module.exports = {
  saveToS3, getFromS3
}
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

module.exports = {
  saveToS3
}
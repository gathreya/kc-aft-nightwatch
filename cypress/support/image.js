const gm = require('gm')

const imagesMatch = (image1, image2) =>
  new Promise((resolve, reject) => {
    const options = {
      file: `./cypress/screenshots/${image2.substring(image2.lastIndexOf('/'))}`,
      tolerance: 0
    }

    gm.compare(image1, image2, options, (err, _, percentDiff) => {
      if (err) reject(err)
      resolve(percentDiff)
    })
  })

module.exports = {
  imagesMatch
}
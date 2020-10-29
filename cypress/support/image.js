const gm = require('gm')

const imagesMatch = (image1, image2, diffImage) =>
  new Promise((resolve, reject) => {
    const options = {
      file: diffImage,
      tolerance: 0
    }

    gm.compare(image1, image2, options, (err, isEqual, percentDiff) => {
      if (err) reject(err)
      console.log(`Diff of ${image1} and ${image2}: ${percentDiff}`)
      if (isEqual) resolve(true)
      else resolve(percentDiff)
    })
  })

module.exports = {
  imagesMatch
}
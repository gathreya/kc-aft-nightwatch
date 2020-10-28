const gm = require('gm')

const imagesMatch = (image1, image2) =>
  new Promise((resolve, reject) => {
    gm.compare(image1, image2, 0, (err, isEqual, percentDiff) => {
      if (err) reject(err)
      console.log(`Diff of ${image1} and ${image2}: ${percentDiff}`)
      if (isEqual) resolve(true)
      else reject(percentDiff)
    })
  })

module.exports = {
  imagesMatch
}
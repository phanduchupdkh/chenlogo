var jimp = require('jimp')
const fs = require('fs')
var jimps = [];

let imagesLink = (fs.readdirSync('./images/', { withFileTypes: true })).filter(t => {
  if (t.name[0] !== '~'
    && (t.name.slice(-4).toLocaleLowerCase() === '.jpg'
      || t.name.slice(-4).toLocaleLowerCase() === '.png')
  ) return true

}) || []
if (imagesLink.length === 0) return
try {
  for (var i = 0; i < imagesLink.length; i++) {
    // console.log(imagesLink[i].name)
    jimps.push(jimp.read('./images/' + imagesLink[i].name))
  }
  jimps.unshift(jimp.read('logo/logo.png'))
  Promise.all(jimps).then(function (data) {
    return Promise.all(jimps);
  }).then(function (data) {
    for (let k = 1; k<data.length; k++){
      data[k].resize(500, jimp.AUTO)
      data[k].composite(data[0].resize(100, jimp.AUTO), 0, 0)
  
      data[k].write(`final-images/test${k}.png`, function () {
        console.log("wrote the image")
      })
    }
  })
} catch (error) {
  console.log('error')
}



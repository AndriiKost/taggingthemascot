function addImgSrc(bucky) {
  let imgFileName = bucky.properties.name
    .replace(/[.,\/#!$'\"?%\^&\*�;:{}=\-_`~()]/g,"")
    .replace(/\s/g, '-').concat("_Front.jpg")

  console.log(imgFileName)

  bucky.properties.imgFileName = imgFileName
}

module.exports = addImgSrc

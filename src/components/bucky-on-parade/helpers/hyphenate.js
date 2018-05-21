function hyphenate(str) {
  str = str
    .replace(/[.,\/#!$'\"?%\^&\*�;:{}=\-_`~()]/g,"")
    .replace(/\s/g, '-')
    .toLowerCase()

  return str
}

module.exports = hyphenate

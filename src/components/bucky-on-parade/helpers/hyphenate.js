function hyphenate(str) {
  str = str
    .replace(/[.,\/#!$'\"?%\^&\*�;:{}=\-_`~()]/g,"")
    .replace(/\s/g, '-')
    .toLowerCase()

  return str
}

export default hyphenate

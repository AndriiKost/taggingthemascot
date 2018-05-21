function addID(locations) {
  for (var i = 0; i < Object.keys(locations).length; i++) {
    let curr = locations[i]
    curr.id = `B${i}`
  }
}

module.exports = addID

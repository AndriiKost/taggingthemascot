/**
  replaces values at specified paths in featureCollection2 with values from featureCollection1
**/
function merge(params) {
  let { newCoords, buckies } = params

  let nameAndCoordsMap = {}

  for (var i = 0; i < newCoords.features.length; i++) {
    let curr = newCoords.features[i]
    nameAndCoordsMap[curr.properties.name] = curr.geometry.coordinates
  }

  for (var i = 0; i < buckies.features.length; i++) {
    let curr = buckies.features[i]
    if (nameAndCoordsMap[curr.properties.name]) {
      curr.geometry.coordinates = nameAndCoordsMap[curr.properties.name]
    }
  }

  console.log(JSON.stringify(buckies))
}

export default merge

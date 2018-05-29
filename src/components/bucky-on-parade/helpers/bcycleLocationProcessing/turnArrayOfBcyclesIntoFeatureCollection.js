function turnArrayOfBcyclesIntoFeatureCollection(arr) {
  let features = []

  for (var i = 0; i < arr.length; i++) {
    let curr = arr[i]
    let { id, name, address, coordinates } = curr
    let { lat, lng } = coordinates || {}

    features.push({
      "type": "Feature",
      "properties": {
        "id": id,
        "name": name,
        "address": address
      },
      "geometry": {
        "type": "Point",
        "coordinates": (coordinates && coordinates.lng && coordinates.lat) ? [lng, lat] : []
      }
    })
  }

  return {
    "type": "FeatureCollection",
    "features": features
  }
}

export default turnArrayOfBcyclesIntoFeatureCollection

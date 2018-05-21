function turnArrayOfBuckiesIntoFeatureCollection(arr) {
  let features = []

  for (var i = 0; i < arr.length; i++) {
    let curr = arr[i]
    let { id, artistName, coordinates, locationAddress, locationName, name, sponsor } = curr
    let { lat, lng } = coordinates || {}

    features.push({
      "type": "Feature",
      "properties": {
        "id": id,
        "name": name,
        "sponsor": sponsor,
        "artistName": artistName,
        "locationName": locationName,
        "address": locationAddress
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

module.exports = turnArrayOfBuckiesIntoFeatureCollection

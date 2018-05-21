import axios from 'axios'

async function getCoordinatesFromAddress(location) {
  let apiKey = 'AIzaSyC4qq2S-otJ5BslWDxF5mVErFnknnTI8rc'
  let formattedAddress =  location.address
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    .replace(/\s/g, '+')
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`

  axios.get(url)
    .then((res) => {
      location.coordinates = res.data.results[0].geometry.location
    })
    .catch((err) => {
      throw err
    })
}

module.exports = getCoordinatesFromAddress

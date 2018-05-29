import axios from 'axios'

async function getCoordinatesFromAddress(bucky) {
  let apiKey = 'AIzaSyC4qq2S-otJ5BslWDxF5mVErFnknnTI8rc'
  let formattedAddress =  bucky.locationAddress
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g,"")
    .replace(/\s/g, '+')
  let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${formattedAddress}&key=${apiKey}`

  axios.get(url)
    .then((res) => {
      bucky.coordinates = res.data.results[0].geometry.location
    })
    .catch((err) => {
      throw err
    })
}

export default getCoordinatesFromAddress

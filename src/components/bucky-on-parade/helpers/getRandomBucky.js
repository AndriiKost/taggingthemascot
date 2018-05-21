import { buckies } from '../data'

function getRandomBucky() {
  let bucky = buckies.features[Math.floor(Math.random() * buckies.features.length)]
  return bucky
}

module.exports = getRandomBucky

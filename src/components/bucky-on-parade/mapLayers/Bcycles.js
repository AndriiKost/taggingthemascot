import React from 'react'
import { BcycleMarker } from '../components'
import { bcycles } from '../data'

class Bcycles extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return(
      <div id={"bcycles-layer"}>
        {
          bcycles.features.map((o, i) => {
            if (!o.geometry.coordinates || !o.geometry.coordinates[0]) {
              return null
            }

            return(
              <BcycleMarker
                bcycle={o}
                key={i}
                onClick={() => alert("Clicked a bcycle.")}
              />
            )
          })
        }
      </div>
    )
  }
}

export default Bcycles

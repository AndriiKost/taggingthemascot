import React from 'react'
import hyphenate from '../helpers'
import BuckyMarker from '../BuckyMarker'
import buckies from './BUCKIES.json'

class Buckies extends React.Component {
  constructor(props) {
    super(props)
    this.selectBuckyFromPathname = this.selectBuckyFromPathname.bind(this)
  }

  componentDidMount() {
    if (window.location.pathname.includes("/bucky/")) {
      setTimeout(() => this.selectBuckyFromPathname(window.location.pathname))
    }
  }

  selectBuckyFromPathname(pathname) {
    let id = pathname.split("/")[2]

    let buckyToSelect = null

    for (var i = 0; i < buckies.features.length; i++) {
      let curr = buckies.features[i]
      if (hyphenate(curr.properties.name) === id.toLowerCase()) {
        buckyToSelect = curr
        break
      }
    }

    if (buckyToSelect) {
      this.props.selectBucky(buckyToSelect)
    }
  }

  render() {
    return(
      <div id={"buckies-layer"}>
        {
          buckies.features.map((o) => {
            if (!o.geometry.coordinates || !o.geometry.coordinates[0]) {
              return null
            }

            let aBuckyIsSelected = null !== this.props.selectedBucky
            let isSelected = aBuckyIsSelected  && this.props.selectedBucky.properties.name === o.properties.name

            return(
              <BuckyMarker
                bucky={o}
                key={o.properties.name || Math.random()}
                onClick={() => (isSelected) ? this.props.deselectBucky(o) : this.props.selectBucky(o)}
                aBuckyIsSelected={aBuckyIsSelected}
                isSelected={isSelected}
              />
            )
          })
        }
      </div>
    )
  }
}

export default Buckies;

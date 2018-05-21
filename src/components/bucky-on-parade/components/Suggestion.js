import React from 'react'
import ChevronRight from 'react-icons/lib/fa/chevron-right'
import LocationPin from 'react-icons/lib/go/location'
import { colors } from '../styles'

class Suggestion extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      hover: false
    }
  }

  render() {
    let { suggestion } = this.props
    let { name, address, imgFileName } = suggestion.properties
    let trimmedAddress = address.split(",")[0]

    let img = (imgFileName && imgFileName.length > 0)
      ? `../../assets/images/buckies/${imgFileName}`
      : null

    return(
      <div
        onMouseEnter={() => this.setState({hover: true})}
        onMouseLeave={() => this.setState({hover: false})}
        style={{
          width: '100%',
          display: 'flex',
          borderBottom: `1px solid ${colors.lightGrey}`,
          padding: '8px 0 8px 0',
          cursor: 'pointer',
          opacity: (this.state.hover) ? 0.75 : 1.0
        }}
      >

        { /* preview image */ }
        <div style={{width: 70, height: 70, textAlign: 'center', border: `1px solid ${colors.lightGrey}`, borderRadius: 5}}>
          <img
            src={img || "../../assets/images/bucky-badger.jpg"}
            style={{height: '100%', width: 'auto'}}
          />
        </div>

        { /* name, artist, and address */ }
        <div style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', padding: '0 5px 0 7px'}}>
          <p style={{fontSize: '1.4rem', textAlign: 'left'}}>
            {name}
          </p>

          <div style={{display: 'flex', alignItems: 'center'}}>
            <LocationPin size={12} color={colors.badgerRed} />

            <p style={{textAlign: 'left', fontSize: '1.4rem', padding: '2px 0px 0px 3px'}}>
              {trimmedAddress || address}
            </p>
          </div>
        </div>

        { /* chevron */ }
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <ChevronRight size={24} color={(this.state.hover) ? colors.badgerRed : colors.lightGrey} />
        </div>
      </div>
    )
  }
}

module.exports = Suggestion

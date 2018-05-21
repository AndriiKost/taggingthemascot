import React from 'react'
import copy from 'copy-to-clipboard'
import { colors } from './styles'
import LinkIcon from 'react-icons/lib/go/link-external'
import LocationIcon from 'react-icons/lib/md/location-on'
import CloseIcon from 'react-icons/lib/md/close'
import CopyIcon from 'react-icons/lib/md/content-copy'

class DetailWindow extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      copiedToClipboardModalIsVisible: false,
      strCopiedToClipboard: null
    }
  }

  copyToClipboard(str) {
    copy(str)

    this.setState({
      strCopiedToClipboard: str
    },
      () => this.showCopiedToClipboardModal(
        () => setTimeout(
          () => this.hideCopiedToClipboardModal(
            () => this.setState({strCopiedToClipboard: null})
          ),
          2000
        )
      )
    )
  }

  showCopiedToClipboardModal(cb) {
    this.setState({ copiedToClipboardModalIsVisible: true })
    if (cb) cb()
  }

  hideCopiedToClipboardModal(cb) {
    this.setState({ copiedToClipboardModalIsVisible: false })
    if (cb) cb()
  }

  render() {
    let { strCopiedToClipboard } = this.state
    let { name, locationName, address, link, imgFileName } = this.props.bucky.properties

    let img = (imgFileName)
      ? `../../assets/images/buckies/${imgFileName}`
      : null

    // mobile
    if (this.props.isMobile) return(
      <div style={{ width: '100%', height: '100%', backgroundColor: colors.white, borderBottom: `2px solid ${colors.lightGrey}` }}>

        { /* statue name and close button */ }
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px 0px 20px'}}>
          <p style={{fontSize: '2.0rem'}}>{name}</p>
          <div onClick={this.props.onExit} className={'behaveLikeLink'} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 32}}>
            <CloseIcon size={28} color={colors.black} />
          </div>
        </div>

        { /* photo, location name, address, and link */ }
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', padding: '0px 0px 15px 0px'}}>

          { /* photo */ }
          <div style={{flex: '1 0 30%'}}>
            <img
              src={img || "../../assets/images/bucky-badger.jpg"}
              style={{width: '70%', height: 'auto', border: `1px solid ${colors.lightGrey}`, borderRadius: 5, margin: '15px 0px 0px 15%'}}
            />
          </div>

          { /* location name, address, and link */ }
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', flex: '1 0 70%'}}>

            { /* pin icon and location name */
              (locationName && locationName.length > 0)
                ? <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 7}}>
                    <LocationIcon size={24} color={colors.badgerRed} />
                    <p style={{fontSize: '1.6rem', padding: '2px 0px 0px 5px'}}>
                      {locationName}
                    </p>
                  </div>
                : null
            }

            { /* address */ }
            <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 7}}>
              <CopyIcon size={24} color={colors.grey} className={'behaveLikeLink'} onClick={() => this.copyToClipboard(address)} />
              <p style={{fontSize: '1.4rem', padding: '2px 0px 0px 5px'}}>
                {address}
              </p>
            </div>

            { /* copied to clipboard modal */ }
            <div className={['copied-to-clipboard-modal', strCopiedToClipboard && 'visible'].join(' ')}>
              <p>{`Copied to clipboard.`}</p>
            </div>

            { /* link */
              (link && link.length > 0)
                ? <a href={link || 'https://www.google.com/'} target={"_blank"}>
                    <div className={'behaveLikeLink'} style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 7}}>
                      <LinkIcon size={22} color={colors.grey} />
                      <p style={{fontSize: '1.6rem', padding: '2px 0px 0px 7px'}}>
                        {"See more info"}
                      </p>
                    </div>
                  </a>
                : null
            }
          </div>
        </div>
      </div>
    )

    // not mobile
    else return(
      <div style={{ width: '100%', height: '100%', padding: 14, backgroundColor: colors.white, border: `1px solid ${colors.lightGrey}`, borderRadius: 4 }}>

        { /* statue name and close button */ }
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <p style={{fontSize: '2.0rem'}}>{name}</p>
          <div onClick={this.props.onExit} className={'behaveLikeLink'} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: 32, height: 32}}>
            <CloseIcon size={28} color={colors.black} />
          </div>
        </div>

        { /* pin icon and location name */
          (locationName && locationName.length > 0)
            ? <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 7}}>
                <LocationIcon size={24} color={colors.badgerRed} />
                <p style={{fontSize: '1.6rem', padding: '2px 0px 0px 5px'}}>
                  {locationName}
                </p>
              </div>
            : null
        }

        { /* arrow icon and address */ }
        <div style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 7}}>
          <CopyIcon size={24} color={colors.grey} className={'behaveLikeLink'} onClick={() => this.copyToClipboard(address)} />
          <p style={{fontSize: '1.4rem', padding: '2px 0px 0px 5px'}}>
            {address}
          </p>
        </div>

        { /* copied to clipboard modal */ }
        <div className={['copied-to-clipboard-modal', strCopiedToClipboard && 'visible'].join(' ')}>
          <p>{`Copied to clipboard.`}</p>
        </div>

        { /* link */
          (link && link.length > 0)
            ? <a href={link || 'https://www.google.com/'} target={"_blank"}>
                <div className={'behaveLikeLink'} style={{display: 'flex', justifyContent: 'flex-start', alignItems: 'center', marginTop: 7}}>
                  <LinkIcon size={22} color={colors.grey} />
                  <p style={{fontSize: '1.6rem', padding: '2px 0px 0px 7px'}}>
                    {"See more info"}
                  </p>
                </div>
              </a>
            : null
        }

        { /* photo */ }
        <div style={{display: 'flex', justifyContent: 'center'}}>
          <img
            src={img || "../../assets/images/bucky-badger.jpg"}
            style={{width: 'auto', height: 275, borderRadius: 5, margin: '0px 0px 0px 0px'}}
          />
        </div>
      </div>
    )
  }
}

export default DetailWindow;

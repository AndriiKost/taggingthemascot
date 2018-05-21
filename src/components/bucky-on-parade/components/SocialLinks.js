import React from 'react'
import Tw from 'react-icons/lib/ti/social-twitter'
import Ig from 'react-icons/lib/ti/social-instagram'
import Fb from 'react-icons/lib/ti/social-facebook'

class SocialLinks extends React.Component {
  constructor(props) {
    super(props)

    this.links = {
      tw: 'https://twitter.com/buckyonparade',
      ig: 'https://www.instagram.com/buckyonparade/',
      fb: 'https://www.facebook.com/buckyonparade/'
    }
  }

  render() {
    return(
      <div style={Object.assign(this.props.style || {}, {display: 'flex', justifyContent: 'center', alignItems: 'center'})}>

        <a href={this.links.tw} target={"_blank"}>
          <Tw
            color={this.props.color || '#000'}
            size={this.props.size || 10}
          />
        </a>

        <div style={{width: this.props.spaceBetween || 5}}></div>

        <a href={this.links.ig} target={"_blank"}>
          <Ig
            color={this.props.color || '#000'}
            size={this.props.size || 10}
          />
        </a>

        <div style={{width: this.props.spaceBetween || 5}}></div>

        <a href={this.links.fb} target={"_blank"}>
          <Fb
            color={this.props.color || '#000'}
            size={this.props.size || 10}
          />
        </a>

      </div>
    )
  }
}

module.exports = SocialLinks

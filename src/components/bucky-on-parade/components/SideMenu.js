import React from 'react'
import Autosuggest from 'react-autosuggest'
import ChevronRight from 'react-icons/lib/fa/chevron-right'
import ChevronLeft from 'react-icons/lib/fa/chevron-left'
import ChevronUp from 'react-icons/lib/fa/chevron-up'
import Close from 'react-icons/lib/md/close'
import LocationPin from 'react-icons/lib/go/location'
import { Suggestion, SocialLinks, Legend } from './'
import { buckies } from '../data'
import { colors } from '../styles'
import { getRandomBucky } from '../helpers'

const autosuggestStyles = {
  container: {
    width: '100%',
    textAlign: 'center'
  },
  input: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.6rem',
    width: '85%',
    borderBottom: `1px solid ${colors.grey}`,
    padding: '8px 5px 8px 5px',
    marginBottom: 0
  },
  inputOpen: {
    borderRadius: '5px 5px 0px 0px'
  },
  suggestionsContainer: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: -6
  },
  suggestionsList: {
    width: '85%',
    listStyle: 'none',
    padding: 0
  },
  suggestionsListLast: {
    backgroundColor: 'blue'
  }
}

const autoSuggestWrapStyles = {
  width: '100%',
  height: '100%',
  backgroundColor: colors.white,
  boxShadow: `-7px 0px 30px ${colors.grey}`,
  overflowY: 'scroll'
}

class SideMenu extends React.Component {
  constructor(props) {
    super(props)

    this.footerHeight = 75

    this.state = {
      value: '',
      suggestions: buckies.features
    }

    this.onQueryChange = this.onQueryChange.bind(this)
    this.getSuggestions = this.getSuggestions.bind(this)
    this.getSuggestionValue = this.getSuggestionValue.bind(this)
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this)
    this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this)
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this)
    this.onSelectRandomBucky = this.onSelectRandomBucky.bind(this)
  }

  onQueryChange(e, { newValue }) {
    this.setState({
      value: newValue
    })
  }

  getSuggestions(value) {
    const inputValue = value.trim().toLowerCase()
    const inputLength = inputValue.length

    return inputLength === 0 ? buckies.features : buckies.features.filter((bucky) => {
      return bucky.properties.name && (
        bucky.properties.name.toLowerCase().indexOf(inputValue) !== -1
        || bucky.properties.address.toLowerCase().indexOf(inputValue) !== -1
      )
    })
  }

  getSuggestionValue(suggestion) {
    return suggestion.properties.name
  }

  onSuggestionsFetchRequested({ value }) {
    this.setState({
      suggestions: this.getSuggestions(value)
    })
  }

  onSuggestionsClearRequested() {
    this.setState({
      suggestions: []
    })
  }

  onSuggestionSelected(event, params) {
    let { suggestion, suggestionValue, suggestionIndex, sectionIndex, method } = params

    // if on mobile, close side menu before selecting bucky
    if (this.props.isMobile) {
      this.props.onToggleSideMenu({bucky: suggestion})
    } else {
      this.props.selectBucky(suggestion)
    }
  }

  onSelectRandomBucky() {
    let randomBucky = getRandomBucky()

    this.onQueryChange(null, { newValue: randomBucky.properties.name })

    // if on mobile, close side menu before selecting bucky
    if (this.props.isMobile) {
      this.props.onToggleSideMenu({bucky: randomBucky})
    } else {
      this.props.selectBucky(randomBucky)
    }
  }

  render() {
    let inputProps = {
      placeholder: 'Search by statue name or street name',
      value: this.state.value,
      onChange: this.onQueryChange,
      autoFocus: true
    }

    return(
      <div style={{width: '100%', height: '100%'}}>

        { /* autosuggest */ }
        <div style={autoSuggestWrapStyles}>
          <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 93, paddingBottom: (this.footerHeight + 20), textAlign: 'center'}}>
            <div className={'behaveLikeLink'} onClick={this.onSelectRandomBucky} style={{display: 'flex', alignItems: 'center', backgroundColor: colors.veryLightGrey, borderRadius: 5, padding: '7px 12px 7px 12px'}}>
              <img
                src={"../../../assets/images/dice.svg"}
                style={{width: 28, height: 28}}
              />

              <p style={{fontSize: '1.6rem', paddingLeft: 7}}>
                {"Select random Bucky"}
              </p>
            </div>

            <div style={{height: 10}} />

            <Autosuggest
              alwaysRenderSuggestions={true}
              focusInputOnSuggestionClick={!this.props.isMobile}
              suggestions={this.state.suggestions}
              onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
              onSuggestionsClearRequested={this.onSuggestionsClearRequested}
              onSuggestionSelected={this.onSuggestionSelected}
              getSuggestionValue={this.getSuggestionValue}
              renderSuggestion={(suggestion) => <Suggestion suggestion={suggestion} />}
              inputProps={inputProps}
              theme={autosuggestStyles}
            />
          </div>
        </div>

        { /* logo and social media links (after autosuggest for z-index purposes) */ }
        <div style={{position: 'absolute', top: 0, left: 0, right: 0}}>
          <div style={{justifyContent: (this.props.isMobile) ? 'center' : 'flex-end', display: 'flex', alignItems: 'center', padding: 10, backgroundColor: colors.badgerRed}}>
            <SocialLinks
              size={22}
              color={colors.white}
              spaceBetween={4}
            />

            { /* closes side menu (mobile only) */
              (this.props.isMobile)
              ? <div onClick={this.props.onToggleSideMenu} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: 0, bottom: 0, right: 0, cursor: 'pointer', padding: '0 18px 0 10px'}}>
                  <Close size={24} color={colors.white} />
                </div>
              : null
            }
          </div>

          { /* logo and link to base site */ }
          <a href="https://buckyonparade.com/" style={{position: 'absolute', top: 10, left: 20}}>
            <img
              src={'../../../assets/images/bucky-on-parade-logo.png'}
              style={{height: 74, width: 'auto'}}
            />
          </a>

          { /* menu toggler (mobile) */ }
          <div onClick={this.props.onToggleSideMenu} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: -38, right: 38, width: 44, height: 44, borderRadius: '22px 22px 0 0', backgroundColor: colors.badgerRed, cursor: 'pointer'}}>
            <ChevronUp style={{marginBottom: 5}} size={18} color={colors.white} />
          </div>
        </div>

        { /* menu toggler (desktop) */ }
        <div onClick={this.props.onToggleSideMenu} style={{display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 52, right: -38, width: 38, height: 44, borderRadius: '0 22px 22px 0', border: `1px solid ${colors.lightGrey}`, backgroundColor: colors.veryLightGrey, cursor: 'pointer'}}>
          {(this.props.isOpen)
            ? <ChevronLeft style={{marginRight: 10}} size={18} color={colors.badgerRed} />
            : <ChevronRight style={{marginRight: 5}} size={18} color={colors.badgerRed} />
          }
        </div>

        { /* footer (mosaic bucky submission prompt) */ }
        <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 0, left: 0, right: 0, padding: 12, height: this.footerHeight, backgroundColor: colors.veryLightGrey, borderTop: `1px solid ${colors.lightGrey}`}}>
          <Legend
            showBcycleStations={this.props.showBcycleStations}
            onToggleBycles={this.props.onToggleBycles}
          />
        </div>
      </div>
    )
  }
}

export default SideMenu

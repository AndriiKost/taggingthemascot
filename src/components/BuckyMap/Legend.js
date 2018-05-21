// import React from 'react'
// import { colors } from './styles'

// class Legend extends React.Component {
//   constructor(props) {
//     super(props)

//     this.bcycleIconPath = '../../../assets/images/icons/bcycle.svg'

//     this.state = {
//       bcyclesChecked: true
//     }

//     this.onCheckBycles = this.onCheckBycles.bind(this)
//   }

//   onCheckBycles() {
//     this.setState({
//       bcyclesChecked: !this.state.bcyclesChecked
//     }, () => alert(this.state.bcyclesChecked))
//   }

//   render() {
//     return(
//       <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', width: '95%', height: '100%'}}>

//         { /* bcycles */ }
//         <div style={{display: 'flex', flex: '1 0 100%', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center'}}>
//           <div style={{width: 26, textAlign: 'center'}}>
//             <img
//               src={this.bcycleIconPath}
//               style={{width: 'auto', height: 28}}
//             />
//           </div>

//           <p style={{paddingLeft: 10, color: colors.black}}>
//             <a href={"#"} target={"_blank"}>
//               {"BCycle"}
//             </a>
//             {" Station"}
//           </p>

//           <input
//             style={{width: 75, height: 75, marginLeft: 15}}
//             type={"checkbox"}
//             defaultChecked={this.props.showBcycleStations}
//             ref={"bcycle-checkbox"}
//             onChange={this.props.onToggleBycles}
//           />
//         </div>
//       </div>
//     )
//   }
// }

// export default Legend

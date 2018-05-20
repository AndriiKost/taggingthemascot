import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import { db, auth } from '../firebase';
import { updateBuckyScore } from '../firebase/db';

import './LeadersPage.css';

class LeadersPage extends Component {
  
  state = {
    team: [],
    ready: false
  }

  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then( snapshot =>
       onSetUsers(snapshot.val())
    )

    db.onceGetUsers().then( snapshot =>
      this.updateStateWithTeamData(snapshot.val())
   )
    
  }

  updateStateWithTeamData = (users) => {
    
    let dataArr = []
    console.log(users)

    Object.keys(users).map(key => 
      // Update state with Firebase Data
      dataArr.push({teamScore: Object.keys(users[key].profile.visited).length,
      teamName: users[key].username,
      partisipants: users[key].profile.members})
    )

    const newArray = dataArr.sort(function(a, b){
      return b.teamScore-a.teamScore
    });
    console.log('newArray', newArray)

    this.state.team = newArray

    console.log(this.state.team)
  }

  render() {
    const { users } = this.props;
    const h1Style = {
      textAlign: 'center',
      marginTop: '10px'
    };

    const teamList = ( ) =>
    <div>
        <ul>
        <div className='TeamScoreContainer'>
        <li> <span className='label'>Bucky's visited</span> 
              <span className='label'>Team Name</span> 
              <span className='label'>Partisipants</span> </li></div>
          {/* Loop through state and render each team info */}
          {this.state.team.map(el => (
            <div className='TeamScoreContainer'> 
            <li className='teamScoreListItem'> 
              <span className='label'>{el.teamScore}</span> 
              <span className='label'>{el.teamName}</span> 
              <span className='label'>{el.partisipants}</span>
            </li>
          </div> ))}
        </ul>
      </div>

    return (
      <div>
        <h1 style={h1Style}><span className="sideBorder"></span>Real Time Team Scores<span className="sideBorder"></span></h1>
        {/* { !!users && <UserList users={users} /> } */}
        { teamList() }
      </div>
    );
  }
}

// // Retrieve data from firebase and render
// const UserList = ({ users }) =>
// <div>
//     <ul>
//     <div className='TeamScoreContainer'>
//     <li> <span className='label'>Bucky's visited</span> 
//           <span className='label'>Team Name</span> 
//           <span className='label'>Partisipants</span> </li></div>
//       {/* Loop through Teams Objects and render each of them  */}
//       {Object.keys(users).map(key => (
//         <div className='TeamScoreContainer'> 
//         <li className='teamScoreListItem'> 
//           <span className='label'>{Object.keys(users[key].profile.visited).length}</span> 
//           <span className='label'>{users[key].username}</span> 
//           <span className='label'>{users[key].profile.members}</span>
//         </li>
//       </div> ) )}
//     </ul>
//     <button onClick={db.updateScore}>Check in</button>
//   </div>

const authCondition = (authUser) => !!authUser;

const mapStateToProps = (state) => ({
    users: state.userState.users,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
  });
  

export default compose(
    connect(mapStateToProps, mapDispatchToProps)
    )(LeadersPage);
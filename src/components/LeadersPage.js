import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import { db, auth } from '../firebase';
import { updateBuckyScore } from '../firebase/db';

import './LeadersPage.css';
import { ScaleLoader } from 'react-spinners';

class LeadersPage extends Component {
  
  state = {
    team: [],
    loading: true
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
    Object.keys(users).map(key => 
      // Update state with Firebase Data
      dataArr.push({teamScore: Object.keys(users[key].profile.visited).length,
      teamName: users[key].username,
      partisipants: users[key].profile.members.participants})
    )

    const newArray = dataArr.sort(function(a, b){
      return b.teamScore-a.teamScore
    });

    this.setState({ team: newArray, loading: false })
  }

  render() {
    const { users } = this.props;

    const teamList = ( ) =>
    <div className='spoofingWillyBackground'>
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
      <div className='gradientSection'>
        <h1 className='LeadersTitle'><span className="sideBorder"></span>Real Time Team Scores<span className="sideBorder"></span></h1>
        <div className='loading'><ScaleLoader color={'#fc0d1b'}  loading={this.state.loading} /></div>
        { teamList() }
      </div>
    );
  }
}

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
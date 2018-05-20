import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { db, auth } from '../firebase';
import { updateBuckyScore } from '../firebase/db';

class TeamScoreTable extends Component {

state = {
    team: [],
    ready: false
  }

  componentDidMount() {
    const { users } = this.props;
    this.updateStateWithTeamData({users});
  }

  updateStateWithTeamData = ( users ) => {
    
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

      return (
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
      )
  }

}

export default TeamScoreTable;
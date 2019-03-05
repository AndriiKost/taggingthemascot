import React, { Component } from 'react';

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

    Object.keys(users).map(key => 
      // Update state with Firebase Data
      dataArr.push({teamScore: Object.keys(users[key].profile.visited).length,
      teamName: users[key].username,
      partisipants: users[key].profile.members})
    )

    const newArray = dataArr.sort(function(a, b){
      return b.teamScore-a.teamScore
    });
    this.state.team = newArray
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
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import { db, auth } from '../firebase';
import { updateBuckyScore } from '../firebase/db';

class BuckyCheckList extends Component {
  
  state = {
    buckies: [],
    ready: false
  }

  componentDidMount() {
    const { onSetUsers } = this.props;

    db.getCheckList().then( snapshot =>
       onSetUsers(snapshot.val())
    )

    db.getCheckList().then( snapshot =>
      this.updateStateWithTeamData(snapshot.val()))
  }

  updateStateWithTeamData = (checklist) => {
    console.log(checklist)
    
    let dataArr = []

    checklist.map(el => 
      // Update state with Firebase Data
      dataArr.push({
      name: el.properties.name,
      id: el.properties.id,
      address: el.properties.address,
      imgFileName: el.properties.imgFileName})
    )
    this.state.buckies = dataArr
  }


render () {
    const { users } = this.props;
    return (
        <div>
            <ol className='Checklist'>
        
            {this.state.buckies.map(el => {
              let img = (el.imgFileName)
              ? `https://deliandigital.com/wp-content/uploads/2018/06/${el.imgFileName}`
              : null

            return(

            <li>
              <img
              src={img} width="10%" height="auto"/>
                {el.name} at {el.address} with id of {el.id}
            </li>
            )})}
        </ol>
        </div>
    )
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
    withAuthorization(authCondition),
    connect(mapStateToProps, mapDispatchToProps)
    )(BuckyCheckList);
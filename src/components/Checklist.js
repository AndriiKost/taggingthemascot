import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from './withAuthorization';
import { db, auth } from '../firebase';
import { updateBuckyScore } from '../firebase/db';

import { ScaleLoader } from 'react-spinners';

class BuckyCheckList extends Component {
  
  state = {
    buckies: [],
    loading: true
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
    this.setState({ loading: false })
  }


render () {
    const { users } = this.props;
    return (
        <div>
            <ul className='Checklist'>
            <div className='loading'><ScaleLoader color={'#fc0d1b'}  loading={this.state.loading} /></div>
            {this.state.buckies.map(el => {
              let img = (el.imgFileName)
              ? `https://deliandigital.com/wp-content/uploads/2018/06/${el.imgFileName}`
              : null

            return(
            <li>
              <p>
                <img src={img} width="10%" height="auto"/>
              </p>
                <p className='Checklist-name'>{el.name}</p>  
                <p className='Checklist-address'>{el.address}</p>
            </li>
            )})}
        </ul>
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
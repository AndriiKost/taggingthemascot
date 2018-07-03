import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import withAuthorization from './withAuthorization';
import { db, auth } from '../firebase';
import { updateBuckyScore } from '../firebase/db';

import { ScaleLoader } from 'react-spinners';

class BuckyCheckList extends Component {
  
  state = {
    buckies: [],
    loading: true,
    copied: false
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
    let dataArr = []
    checklist ? checklist.map(el => 
      // Update state with Firebase Data
      dataArr.push({
      name: el.properties.name,
      id: el.properties.id,
      address: el.properties.address,
      imgFileName: el.properties.imgFileName,
      link: el.properties.link})
    ) : alert('having problems to get checklist')
    this.state.buckies = dataArr
    this.setState({ loading: false })
  }


render () {
    const { users } = this.props;
    return (
        <div className='ChecklistPage'>
            <ul className='Checklist'>
            <div className='loading'><ScaleLoader color={'#fc0d1b'}  loading={this.state.loading} /></div>
            {this.state.buckies.map(el => {
              let img = (el.imgFileName)
              ? `https://deliandigital.com/wp-content/uploads/2018/06/${el.imgFileName}`
              : null

            return(
            <li key={el.id}>
              <p>
                {/* <a href={el.link}>
                  <img src={img} width="10%" height="auto"/>
                </a> */}
              </p>
                <p className='Checklist-name'>{el.name}</p>  

                <CopyToClipboard text={el.address}
                    onCopy={() => {this.setState({copied: true}), setTimeout(() => {
                      this.setState({ copied: false })
                    }, 2000)}}>
                <p className='Checklist-address'>{el.address}</p>
                </CopyToClipboard>
            </li>
            )})}
        </ul>
        {this.state.copied ? <span className='copyBox'>Copied.</span> : null}
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
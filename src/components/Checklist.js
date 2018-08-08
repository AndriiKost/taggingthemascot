import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import withAuthorization from './withAuthorization';
import { db } from '../firebase';
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

    this.setState({ loading: false, buckies: dataArr })
  }


render () {
    return (
        <div className='ChecklistPage'>
            <ul className='Checklist'>
            <div className='loading'><ScaleLoader color={'#fc0d1b'}  loading={this.state.loading} /></div>
            {this.state.buckies.map(el => {
            return(
            <li key={el.id}>
              <p>
              </p>
                <p className='Checklist-name'>{el.name}</p>  

                <CopyToClipboard text={el.address}
                    onCopy={() => {
                      this.setState({copied: true}); 
                      setTimeout(() => {
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
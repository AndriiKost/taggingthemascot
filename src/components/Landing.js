import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import { db } from '../firebase';

class LandingPage extends Component {
  componentDidMount() {
    const { onSetUsers } = this.props;

    db.onceGetUsers().then(snapshot =>
      onSetUsers(snapshot.val())
    );
  }

    render() {
      const { users } = this.props;
      const h1Style = {
        textAlign: 'center'
      };
  
      return (
        <div className='gradientSection'>
          <h1 style={h1Style}>What's happening on the streets of Madison</h1>
          {/* { !!users && <UserList users={users} /> } */}
        </div>
      );
    }
}

// const UserList = ({ users }) =>
//   <div className='eventSection'>
//     {Object.keys(users).map(key => users[key].events ? EventList(users[key].events, users[key]) : null )}
//   </div>

//   const EventList = (events, place) =>
//       Object.keys(events).map(key => 
//         <div key={key} className='event-box'>
//           <h2>  {events[key].event_name}  </h2>
//           <span> {events[key].price === 'free' ? 'FREE' : '$' + events[key].price}  </span>
//           <p style={{textTransform: 'capitalize', fontSize: '0.9em', color: '#4C4C4C'}}>
//             {place.username}
//           </p>
//           <hr />
//           <div className='image-in-event-box'><img src={events[key].banner} /></div>
//         </div>
// )

const mapStateToProps = (state) => ({
  users: state.userState.users,
});
          
const mapDispatchToProps = (dispatch) => ({
  onSetUsers: (users) => dispatch({ type: 'USERS_SET', users }),
});
          
        
export default compose(
  connect(mapStateToProps, mapDispatchToProps)
  )(LandingPage);
import { db, auth } from './firebase';
import { buckies } from '../components/data'
// User API

export const doCreateUser = (uid, username, email) =>
  db.ref(`users/${uid}`).set({
    uid,
    username,
    email,
    profile: {
      visited: 0,
      members: {
        participants: 1
      },
      checklist: buckies
    },
  });

  export const updateScore = ( score ) =>  {
  let postData = {
    date: new Date()
  };

  // Get a key for a new Post.
  let newPostKey = db.ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  let updates = {};
  updates['users/' + auth.currentUser.uid + '/profile/visited/' + newPostKey] = postData;

  return db.ref().update(updates);
  
  }

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const updateImageURL = (url) =>
  db.ref(`users/` + auth.currentUser.uid + '/profile').set({
    profile_picture : url
  });

export const getCheckList = () => 
  db.ref('users/' + auth.currentUser.uid +'/profile/checklist/buckies/features').once('value')

  export const getBuckies = () => 
  db.ref('users/' + auth.currentUser.uid +'/profile/checklist/buckies/features').once('value')

export const addEvent = (banner, event_name, price) =>
db.ref(`users/` + auth.currentUser.uid + '/profile/members').set({
    banner,
    event_name,
    participants: 2
    // price,
  });

  export const removeBuckyFromTheUserList = (buckyID) => {
    db.ref('users/' + auth.currentUser.uid + '/profile/checklist/buckies/features/').child(buckyID).remove()
  }



// Other Entity APIs ...

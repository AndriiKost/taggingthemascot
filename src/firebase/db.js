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
    // Get a key for a new Post.
    // var newScore = db.ref(`users/` + auth.currentUser.uid + '/profile/visited').push(1)
    // console.log(newScore)

  var postData = {
    date: new Date()
  };

  // Get a key for a new Post.
  var newPostKey = db.ref().child('posts').push().key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  var updates = {};
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

// Other Entity APIs ...

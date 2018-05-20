import { db, auth } from './firebase';

// User API

export const doCreateUser = (uid, username, email) =>
  db.ref(`users/${uid}`).set({
    uid,
    username,
    email,
    profile: {
      visited: 0,
      members: 1,
    },
  });

  export const updateScore = ( score ) =>  {
    // // A post entry.
    // let buckyScore = db.ref(`users/` + auth.currentUser.uid + '/profile').once('value');
  
    // Get a key for a new Post.
    var newScore = db.ref(`users/` + auth.currentUser.uid + '/profile/visited').push(1)
    console.log(newScore)
    // Write the new post's data simultaneously in the posts list and the user's post list.
    // var updates = {};
    // updates['/posts/' + newPostKey] = postData;
    // updates['/user-posts/' + uid + '/' + newPostKey] = postData;

  }

export const onceGetUsers = () =>
  db.ref('users').once('value');

export const updateImageURL = (url) =>
  db.ref(`users/` + auth.currentUser.uid + '/profile').set({
    profile_picture : url
  });

export const addEvent = (banner, event_name, price) =>
db.ref(`users/` + auth.currentUser.uid + '/events/' + Math.floor(Math.random() * 958184759832) + 1 ).set({
    banner,
    event_name,
    price,
  });

// Other Entity APIs ...

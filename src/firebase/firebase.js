import * as firebase from 'firebase';

// Production Config
const prodConfig = {
  apiKey: "AIzaSyAfiIQGLz0VS0hOn6PfbuWHndsR92xDNkU",
  authDomain: "amazing-bucky-race.firebaseapp.com",
  databaseURL: "https://amazing-bucky-race.firebaseio.com",
  projectId: "amazing-bucky-race",
  storageBucket: "",
  messagingSenderId: "392473409342"
};
  
  // Development Config
  const devConfig = {
    apiKey: "AIzaSyAfiIQGLz0VS0hOn6PfbuWHndsR92xDNkU",
    authDomain: "amazing-bucky-race.firebaseapp.com",
    databaseURL: "https://amazing-bucky-race.firebaseio.com",
    projectId: "amazing-bucky-race",
    storageBucket: "",
    messagingSenderId: "392473409342"
  };

  // Config Logic
  const config = process.env.NODE_ENV === 'production'
  ? prodConfig
  : devConfig;

  if (!firebase.apps.length) {
    firebase.initializeApp(config);
  }

  const db = firebase.database();
  const auth = firebase.auth();

  export { db, auth };
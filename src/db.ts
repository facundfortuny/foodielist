import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import store from '@/store';

// firebase init
const firebaseConfig = {
  apiKey: process.env.VUE_APP_APIKEY,
  authDomain: process.env.VUE_APP_AUTHDOMAIN,
  databaseURL: process.env.VUE_APP_DB,
  projectId: process.env.VUE_APP_PID,
  storageBucket: process.env.VUE_APP_SB,
  messagingSenderId: process.env.VUE_APP_MSID,
  appId: process.env.VUE_APP_APPID,
};

export const db = firebase.initializeApp(firebaseConfig).firestore();
export const auth = firebase.auth();

auth.onAuthStateChanged((user) => {
  store.dispatch('auth/setUser', user);
});

export const restaurantsCollection = db.collection('restaurants');

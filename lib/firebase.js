import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAuQ52bhuwT4aaPigUGfoUelBEvtrET8iE',
  authDomain: 'nextfire-blog-d8d39.firebaseapp.com',
  projectId: 'nextfire-blog-d8d39',
  storageBucket: 'nextfire-blog-d8d39.appspot.com',
  messagingSenderId: '1041870296861',
  appId: '1:1041870296861:web:1eaf7ea93463f7d97ab3f4',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();

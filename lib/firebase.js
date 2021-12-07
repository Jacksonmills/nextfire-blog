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

// helper functions

export const fromMillis = firebase.firestore.Timestamp.fromMillis;

// gets a users/{uid} document with username
// @param {string} username
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection('users');
  const query = usersRef.where('username', '==', username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

// converts a firestore doc to JSON
// @param {DocumentSnapshot} doc
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    createdAt: data.createdAt.toMillis(),
    updatedAt: data.updatedAt.toMillis(),
  };
}

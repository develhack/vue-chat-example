import firebase from 'firebase/app';
import 'firebase/auth';

export async function login(email, password) {
  return firebase.auth()
    .signInWithEmailAndPassword(email, password);
}

export async function logout() {
  return firebase.auth()
    .signOut();
}

export function currentUser() {
  return firebase.auth()
    .currentUser;
}

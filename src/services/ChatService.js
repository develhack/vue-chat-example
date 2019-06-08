import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

let _unsubscribe = null;

export function subscribe(callback) {
  unsubscribe();
  _unsubscribe = firebase.firestore()
    .collection('Chat')
    .orderBy('postedAt')
    .onSnapshot(snapshots => {
      const posts = [];
      snapshots.forEach(snapshot => {
        const post = snapshot.data();
        post.id = snapshot.id;
        post.self = post.poster === firebase.auth().currentUser.email;
        posts.push(post);
      });
      callback(posts);
    });
}

export function unsubscribe() {
  if (_unsubscribe) _unsubscribe();
}

export async function post(message) {
  return firebase.firestore()
    .collection('Chat')
    .add({
      message,
      poster: firebase.auth().currentUser.email,
      postedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

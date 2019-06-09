import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app';
import 'firebase/auth';

import firebaseConfig from './firebase-config.json';

import Login from './views/Login.vue';
import Chat from './views/Chat.vue';

firebase.initializeApp(firebaseConfig);

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/chat',
      component: Chat,
    },
    {
      path: '*',
      redirect: '/login'
    }
  ]
});

let promise = new Promise((resolve) => {
  firebase.auth().onAuthStateChanged(resolve);
});

const beforeEach = (to, from, next) => {
  if (!firebase.auth().currentUser) {
    return to.path === '/login' ? next() : next('/login');
  }
  return to.path !== '/login' ? next() : next('/chat');
};

router.beforeEach((to, from, next) => {
  if (!promise) return beforeEach(to, from, next);
  promise.then(() => {
    promise = null;
    return beforeEach(to, from, next);
  });
});

export default router;

<template>
  <v-app>
    <v-toolbar
      color="primary"
      dark
      app
    >
      <span class="title">Vue.jsとAngularを比較しながら作るアプリ</span>
      <v-spacer></v-spacer>
      <v-btn
        @click="logout"
        v-if="isLoggedIn()"
        icon
      >
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer app>
      <span class="pr-3">Copyright © 2018 Develhack K.K. All Rights reserved.</span>
    </v-footer>
  </v-app>
</template>

<script>
import { currentUser, logout } from '@/services/LoginService';

export default {
  methods: {
    isLoggedIn: function() {
      return !!currentUser();
    },
    logout: async function() {
      await logout();
      this.$router.replace('/login');
    }
  }
}
</script>

<style>
html, body {
  height: 100%;
  overflow: hidden;
}
.application {
  height: 100%;
}
.logo {
  height:75%;
}
.title {
  margin-left: 16px;
}
.v-content, .container {
  height: 100%;
}
.v-footer {
  place-content: flex-end;
}
</style>

<template>
  <v-layout
    class="login"
    align-center
    fill-height
    justify-center
  >
    <v-flex
      md4
      sm8
      xs12
    >
      <v-form
        @submit.prevent="login"
        ref="form"
        v-model="valid"
      >
        <v-card class="pa-3 elevation-12">
          <v-card-text>
            <v-alert
              v-model="failed"
              error
            >
              <span>認証できません</span>
            </v-alert>
            <v-text-field
              :disabled="processing"
              :rules="requiredRules"
              autocomplete="off"
              label="メールアドレス"
              type="email"
              v-model="email"
              required
            />
            <v-text-field
              :disabled="processing"
              :rules="requiredRules"
              autocomplete="off"
              label="パスワード"
              type="password"
              v-model="password"
              required
            />
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn
              :disabled="!valid || processing"
              color="info"
              type="submit"
              outline
            >
              <span>ログイン</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-flex>
  </v-layout>
</template>

<script>
import { login } from '@/services/LoginService';

export default {
  name: "login",
  data: () => {
    return {
      email: '',
      password: '',
      valid: false,
      processing: false,
      failed: false,
      requiredRules: [
        v => !!v || '入力してください'
      ]
    };
  },
  methods: {
    login: async function() {
      try {
        this.failed = false;
        this.processing = true;
        await login(this.email, this.password);
        this.$router.replace('/chat');
      } catch (error) {
        this.failed = true;
      } finally {
        this.processing = false;
      }
    }
  }
};
</script>

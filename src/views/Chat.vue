<template>
  <v-layout
    class="chat"
    column
    fill-height
  >
    <v-flex
      class="posts"
      ref="posts"
    >
      <div
        :class="{ self: post.self }"
        :key="post.id"
        class="post ma-3"
        v-for="post in posts"
      >
        <v-card>
          <v-card-text>
            <div
              class="grey--text" 
              v-if="!post.self"
            >
              <span>{{ post.poster }}</span>
            </div>
            <div>
              <span>{{ post.message }}</span>
            </div>
          </v-card-text>
        </v-card>
      </div>
    </v-flex>
    <v-form
      @submit.prevent="post"
      class="px-3"
      ref="form"
    >
      <v-layout
        align-center
        justify-center
      >
        <v-flex
          class="pr-3"
          xs12
        >
          <v-text-field
            :disabled="processing"
            autocomplete="off"
            label="メッセージ"
            v-model="message"
            autofocus
          />
        </v-flex>
        <v-flex>
          <v-btn
            :disabled="!message || processing"
            color="info"
            type="submit"
            outline
          >
            <span>送信</span>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-form>
  </v-layout>
</template>

<script>
import { subscribe, unsubscribe, post } from '@/services/ChatService';

export default {
  name: 'chat',
  data: () => {
    return {
      posts: [],
      message: '',
      processing: false,
    };
  },
  methods: {
    post: async function () {
      try {
        this.processing = true;
        await post(this.message);
        this.message = '';
      } finally {
        this.processing = false;
      }
    },
    update(posts) {
      this.posts = posts;
    }
  },
  watch: {
    posts: function() {
      const element = this.$refs.posts;
      this.$nextTick(() => element.scrollTop = element.scrollHeight);
    }
  },
  created: function() {
    subscribe(this.update);
  },
  destroyed: function() {
    unsubscribe();
  }
}
</script>

<style>
.posts {
  overflow-y: auto;
}
.post {
  display: flex;
  word-break: break-all;
}
.post:not(.self) {
  place-content: center flex-start;
}
.post.self {
  place-content: center flex-end;
}
.post.self .v-card {
  background-color: rgb(137,229,77);
}
</style>

<script setup>
import { ref } from 'vue'
import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.DEV ? "http://127.0.0.1:8090" : "https://pocket.iranika.info");

const id = ref("")
const pw = ref("")
const isLogin = ref(pb.authStore.isValid);

async function Login() {
  try {
    await pb.collection('users').authWithPassword(id.value, pw.value);
    isLogin.value = pb.authStore.isValid;
  } catch (e) {
    alert("ログイン失敗")
  }
}

async function Logout(){
  pb.authStore.clear();
  isLogin.value = pb.authStore.isValid;
}

</script>

<template>
  <div>
    <div v-if="isLogin">
      ログイン済みです。<br />
      <button @click="Logout">ログアウト</button>
    </div>
    <div v-else>
      ログインしてください。<br />
      ID:<input name="id" v-model="id"></input><br />
      PW:<input name="pw" type="password" v-model="pw"></input><br />
      <button @click="Login">ログイン</button>
    </div>
  </div>
</template>

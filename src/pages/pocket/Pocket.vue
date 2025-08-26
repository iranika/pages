<script setup>
import { ref } from 'vue'
import PocketBase from 'pocketbase';

const pb = new PocketBase(import.meta.env.DEV ? "http://127.0.0.1:8090" : "https://pocket.iranika.info");
pb.authStore.isValid

const id = ref("")
const pw = ref("")

async function doLogin(){
    try{
        await pb.collection('users').authWithPassword(id.value, pw.value);
        alert("ログイン成功")
        location.reload();
    }catch(e){
        alert("ログイン失敗")
    }
}
</script>

<template>
  <div>
    <div v-if="pb.authStore.isValid">
      ログイン済みです。
      <button @click="pb.authStore.clear();location.href.reload();">ログアウト</button>
    </div>
    <div v-else>
      ログインしてください。<br />
      ID:<input name="id" v-model="id"></input><br />
      PW:<input name="pw" type="password" v-model="pw"></input><br />
      <button @click="doLogin">ログイン</button>
    </div>
  </div>
</template>

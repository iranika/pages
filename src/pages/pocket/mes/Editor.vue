<script setup lang="ts">
import EditorJS from '@editorjs/editorjs';
import List from "@editorjs/list";
import Header from "@editorjs/header";
import Pocket from "pocketbase";
import {ref} from "vue";
import { Select } from 'primevue';

const pb = new Pocket(import.meta.env.DEV ? "http://127.0.0.1:8090" : "https://pocket.iranika.info")

const isLogin = ref(pb.authStore.isValid)
if(!isLogin.value){
  alert("ログインしていません。ログインページに戻ります。")
  location.href = "/pocket/"
}
const text = ref("");

const selectText = ref("aaaaa");
const selectOptions = ref([])
pb.collection("mes").getFullList().then(value => {
  //@ts-ignore
  selectOptions.value = value
  selectText.value = value[0]?.id
  console.log(selectOptions.value)
})


const editor = new EditorJS({
  holder: "editorjs",
  tools: {},
});
async function show(){
  text.value = JSON.stringify(await editor.save())
}
async function save(){
  let json = JSON.stringify(await editor.save())
  try{
    let result = await pb.collection("mes").create({
      owner: pb.authStore.record?.id,
      json: json
    });
    alert("新規作成！");
  }catch(err){
    alert("失敗");
    console.log(err);
  }
}

async function create(){
  // 上限に達しているか確認する

}

class DataStore {

  localFileHandler:any;
  mesText = ref("")

  async save(){

  }
  async open(){

  }
}


</script>
<style>
.editor {
  border: solid 1px lightgray;
  width: 800px;
}
</style>
<template>
  <div>
    <h1>Mes Editor β</h1>
    <div v-if="isLogin">Welcome {{ pb.authStore.record?.name }} </div>
    <div id="editorjs" class="editor"></div>
    <Select v-model="selectText" :options="selectOptions" option-label="title" option-value="id"></Select>
    <button @click="show">表示</button>
    <button >新規</button>
    <button @click="save">保存</button>
    <div v-text="text"></div>
  </div>
</template>
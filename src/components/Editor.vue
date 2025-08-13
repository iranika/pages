<script setup lang="ts">
import Editor from 'primevue/editor';
import { ref } from 'vue';

const value = ref('<p>Type here...</p>');
</script>

<template>
  <Editor v-model="value" editorStyle="height: 320px" />
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import { ref } from 'vue';

const value = ref('<p>Type here...</p>');
</script>

<template>
  <Button label="Save" icon="pi pi-check" iconPos="right" />
</template>

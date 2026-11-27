<script setup>
import { ref } from 'vue';
import VueQrcode from 'vue-qrcode';

const maxUrlBytes = 512;
const qrColor = { dark: '#000000ff', light: '#ffffffff' };
const draftUrl = ref('https://example.com/');
const previewUrl = ref(draftUrl.value);
const status = ref('例URLを編集して、プレビューを更新できます。');

function updatePreview() {
  const inputUrl = draftUrl.value.trim();

  if (new TextEncoder().encode(inputUrl).length > maxUrlBytes) {
    status.value = `URLはUTF-8で${maxUrlBytes}バイト以内にしてください。`;
    return;
  }

  let parsedUrl;

  try {
    parsedUrl = new URL(inputUrl);
  } catch {
    status.value = 'http:// または https:// で始まるURLを入力してください。';
    return;
  }

  if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
    status.value = 'http:// または https:// で始まるURLを入力してください。';
    return;
  }

  const normalizedUrl = parsedUrl.href;

  if (new TextEncoder().encode(normalizedUrl).length > maxUrlBytes) {
    status.value = `URLはUTF-8で${maxUrlBytes}バイト以内にしてください。`;
    return;
  }

  previewUrl.value = normalizedUrl;
  status.value = 'プレビューを更新しました。';
}
</script>

<template>
  <div class="qr-demo">
    <form class="qr-demo-form" @submit.prevent="updatePreview">
      <label for="qr-demo-url">例URL</label>
      <div class="qr-demo-controls">
        <input
          id="qr-demo-url"
          v-model="draftUrl"
          type="url"
          autocomplete="url"
          spellcheck="false"
        />
        <button type="submit">プレビューを更新</button>
      </div>
      <p class="qr-demo-status" aria-live="polite">{{ status }}</p>
    </form>
    <div class="qr-label-preview" aria-label="QRラベルのプレビュー">
      <VueQrcode :value="previewUrl" :width="512" :margin="4" :color="qrColor" type="image/png" />
      <div class="qr-label-copy">
        <span>LABEL / 01</span>
        <strong>QRラベル</strong>
        <p>{{ previewUrl }}</p>
      </div>
    </div>
  </div>
</template>

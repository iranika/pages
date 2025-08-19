<template>
  <div>
    <template v-if="mode === 'edit'">
      <h2 class="text-h2">QR印刷くん</h2>
      <div>QRコードをラベルシートに印刷できるようにするためのツールです</div>
      <div>URLを貼り付けてください（改行区切り）</div>
      <div>
      <Textarea style="width:600px; height: 250px" v-model="text"/>
      </div>
      <button v-on:click="switchPrint">印刷ページに行く</button>
    </template>
    <template v-if="mode === 'print'">
      <div id="print-button" style="position: absolute; float:left; z-index: 100">
        <button v-on:click="doPrint">印刷</button>
        <button v-on:click="mode = 'edit'">編集ページに戻る</button>
      </div>
      <template v-for="(page,i) in pd">
        <div v-bind:class="'container2 break-after'">
          <template v-for="(card,index) in page">
            <div class="card" v-bind:class="{ 'bg-red': [0,3,4,7,8,11].includes(index)}">
              <vue-qrcode width="100" :value="card[0]"></vue-qrcode>
              <!-- <h3 class="title">店舗名<div class="shopNo">店舗コード</div>
              </h3>
              <div class="product">製品名</div>
              <div class="order">発注数</div> -->
            </div>
          </template>
        </div>
      </template>
    </template>
  </div>
</template>
<style>
  @page {
    size: A4;
    margin-left: 19mm;
    margin-right: 19mm;
    margin-top: 21mm;
    margin-bottom: 24mm;
  }

  .container2 {
    float: none;
    display: block;
    width: 172mm;
    height: 252mm;
  }
  .break-after {
    page-break-after: always;
    break-after: page;
  }

  .card {
    width: 86mm;
    height: 42mm;
    float: left;
    padding-left: 7mm;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .bg-red {
    background-color: red;
  }

</style>

<script setup>
import VueQrcode from 'vue-qrcode'
import { ref } from 'vue';
import { Textarea } from 'primevue';

let mode = ref('edit');

let text = ref(`https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
https://www.google.com
`)

let pd = ref([
  [
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
  ],
  [
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
    ["https://www.google.com"],
  ]
]);

const doPrint = function() {
  const printButton = document.getElementById('print-button');
  if (printButton) {
    printButton.style.display = 'none';
  }
  window.print();
  if (printButton) {
    printButton.style.display = 'block';
  }
}

function splitPages(text){
  const lines = text.split("\n");
  const pages = [];
  let currentPage = [];

  lines.forEach((line, index) => {
    currentPage.push(line);
    if ((index + 1) % 12 === 0 || index === lines.length - 1) {
      pages.push(currentPage);
      currentPage = [];
    }
  });

  return pages;
}

const switchPrint = function() {
  pd.value = splitPages(text.value);
  mode.value = 'print';
}

</script>
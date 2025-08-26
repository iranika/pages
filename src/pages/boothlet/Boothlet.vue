<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { InputText, InputIcon, IconField } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';


const libdata = {"29941":["29941","たいとる","さーくる","ゆーあるえる"]}

const pd = ref(Object.entries(libdata).map(([k, v]) => [v[1], v[2], v[3]]));

const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});

globalThis.addEventListener("message", (e)=>{
    if(e.data.pd){
        pd.value = Object.entries(e.data.pd).map(([k, v]) => [v[1], v[2], v[3]]);
    }
})


</script>



<template>
  <div>
    <DataTable :value="pd" responsiveLayout="scroll" v-model:filters="filters" filterDisplay="menu" :globalFilterFields="['0', '1', '2']">
      <template #header>
        <div class="flex justify-end">
          <IconField>
            <InputIcon>
              <i class="pi pi-search" />
            </InputIcon>
            <InputText v-model="filters['global'].value" placeholder="Keyword Search" />
          </IconField>
        </div>
      </template>
      <Column field="0" header="タイトル"></Column>
      <Column field="1" header="サークル"></Column>
      <Column field="2" header="URL"></Column>
    </DataTable>
  </div>
</template>

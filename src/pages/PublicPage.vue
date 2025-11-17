<template>
<q-layout>
  <q-page-container>
  <q-page class="flex flex-center q-pa-lg">
   <div>
    <q-card class="q-pa-xl" style="max-width: 450px; width: 100%;">
      <div class="text-h5 text-center q-mb-md">{{ page?.title }}</div>

      <LinkCard
        v-for="(l, index) in page?.links || []"
        :key="index"
        :label="l.label"
        :url="l.url"
      />
    </q-card>

    <div class="text-center q-mt-md">
      <router-link to="/">Criar conta no SharePage</router-link>
    </div>
   </div>
  </q-page>
  </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { api } from 'boot/axios'
import { useRoute } from 'vue-router'
import LinkCard from 'src/components/LinkCard.vue'

const route = useRoute()
const page = ref(null)

onMounted(async () => {
  const id = route.params.pageId
  const res = await api.get(`/linkpages/${id}`)
  page.value = res.data
})
</script>

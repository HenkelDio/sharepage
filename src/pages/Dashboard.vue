<template>
  <q-page class="q-pa-lg">
    <div class="row items-center justify-between q-mb-lg">
      <div class="text-h5">Minhas Páginas</div>
      <q-btn color="primary" icon="add" label="Criar Nova Página" to="/create" />
    </div>

    <q-card v-if="pages.length === 0" class="q-pa-md text-center text-grey-7">
      Nenhuma página criada ainda.
    </q-card>

    <q-list v-else bordered separator class="rounded-borders">
      <q-item v-for="p in pages" :key="p.id" clickable>
        <q-item-section>
          <q-item-label class="text-bold">{{ p.title }}</q-item-label>
          <q-item-label caption>
            Link público: 
            <span class="text-primary">{{ publicUrl(p.id) }}</span>
          </q-item-label>
        </q-item-section>

        <q-item-section side top>
          <q-btn
            flat
            icon="link"
            color="primary"
            @click.stop="openPublic(p.id)"
          />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useLinkPageStore } from 'src/stores/linkPageStore'

const store = useLinkPageStore()
const pages = store.pages

onMounted(() => {
  store.loadPages()
})

function publicUrl(id) {
  return window.location.origin + '/#/p/' + id
}

function openPublic(id) {
  window.open(publicUrl(id), '_blank')
}
</script>

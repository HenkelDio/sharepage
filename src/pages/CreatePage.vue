<template>
  <q-page class="q-pa-lg">
    <div class="text-h5 q-mb-lg">Criar Nova Página</div>

    <q-card class="q-pa-lg">

      <!-- Título da página -->
      <q-input
        label="Título da Página"
        v-model="title"
        outlined
        class="q-mb-lg"
      />

      <div class="text-subtitle1 q-mb-md">Links</div>

      <!-- Repetidor de links -->
      <div v-for="(link, index) in links" :key="index" class="row q-col-gutter-md q-mb-md">

        <q-input
          class="col"
          outlined
          v-model="link.label"
          label="Nome do Link"
        />

        <q-input
          class="col"
          outlined
          v-model="link.url"
          label="URL"
        />

        <q-btn
          flat dense round icon="delete"
          color="negative"
          @click="removeLink(index)"
        />
      </div>

      <!-- Botão adicionar link -->
      <q-btn
        flat
        color="secondary"
        label="+ Adicionar Link"
        class="q-mt-sm"
        @click="addLink"
      />

      <q-separator class="q-my-lg" />

      <!-- Botão salvar -->
      <q-btn
        color="primary"
        label="Salvar Página"
        class="full-width"
        @click="save"
      />
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useLinkPageStore } from 'src/stores/linkPageStore'

const router = useRouter()
const $q = useQuasar()
const store = useLinkPageStore()

const title = ref('')
const links = ref([
  { label: '', url: '' }
])

function addLink() {
  links.value.push({ label: '', url: '' })
}

function removeLink(index) {
  links.value.splice(index, 1)
}

async function save() {
  if (!title.value.trim()) {
    $q.notify({ type: 'negative', message: 'Informe um título' })
    return
  }

  $q.loading.show();
  try {
    await store.createPage(title.value, links.value)
  } catch (e) {
    $q.notify({ type: 'negative', message: 'Erro ao criar página' })
    return;
  }

  $q.loading.hide();

  $q.notify({ type: 'positive', message: 'Página criada com sucesso!' })

  router.push('/dashboard')
}
</script>

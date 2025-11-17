<template>
  <q-layout>
  <q-page-container>
  <q-page class="flex flex-center q-pa-md">
    <q-card class="q-pa-lg" style="width: 350px">
      <q-card-section>
        <div class="text-h6 text-center">Login</div>
      </q-card-section>

      <q-input v-model="email" type="email" label="Email" outlined class="q-mb-md" />
      <q-input v-model="password" type="password" label="Senha" outlined class="q-mb-md" />

      <q-btn label="Entrar" color="primary" @click="doLogin" class="full-width" />

      <div class="text-center q-mt-md">
        <router-link to="/register">Criar conta</router-link>
      </div>
    </q-card>
  </q-page>
</q-page-container>
</q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/userStore'
import { useQuasar } from 'quasar'

const router = useRouter()
const store = useUserStore()

const $q = useQuasar()

const email = ref('')
const password = ref('')

async function doLogin() {
  
  try {
    await store.login(email.value, password.value)
  } catch(e) {
    $q.notify({ type: 'negative', message: 'Não foi possível fazer login' })
    return
  }

  router.push('/dashboard')
}
</script>

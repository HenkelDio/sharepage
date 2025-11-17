<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-blue-6">
      <q-toolbar>

        <q-btn
          flat dense round icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          SharePage
        </q-toolbar-title>

      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <div class="text-h6 text-center q-pa-md">SHAREPAGE</div>
      <q-separator spaced />

      <q-list padding>
        
        <q-item clickable v-ripple to="/dashboard">
          <q-item-section avatar>
            <q-icon name="dashboard" />
          </q-item-section>
          <q-item-section>
            Dashboard
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple to="/create">
          <q-item-section avatar>
            <q-icon name="add_circle" />
          </q-item-section>
          <q-item-section>
            Criar Página
          </q-item-section>
        </q-item>

        <q-separator spaced />

        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            Sair
          </q-item-section>
        </q-item>

      </q-list>
    </q-drawer>

    <!-- Conteúdo -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from 'src/stores/userStore'

const leftDrawerOpen = ref(false)
const router = useRouter()
const userStore = useUserStore()

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

function logout() {
  userStore.user = null
  userStore.token = null
  router.push('/')
}
</script>

<template>
  <q-layout>
  <q-page-container>
  <q-page class="q-pa-lg flex flex-center">
    <q-card style="width: 400px" class="q-pa-md">
      
      <div class="text-h5 text-center q-mb-lg">Criar Conta</div>

      <q-input
        filled
        label="Nome completo"
        v-model="name"
        class="q-mb-md"
        :rules="[val => !!val || 'Informe seu nome']"
      />

      <q-input
        filled
        label="E-mail"
        v-model="email"
        type="email"
        class="q-mb-md"
        :rules="[
          val => !!val || 'Informe seu email',
          val => /.+@.+\..+/.test(val) || 'Email inválido'
        ]"
      />

      <q-input
        filled
        label="Senha"
        v-model="password"
        type="password"
        class="q-mb-md"
        :rules="[val => val.length >= 6 || 'Mínimo de 6 caracteres']"
      />

      <q-btn
        label="Criar Conta"
        color="primary"
        class="full-width q-mt-md"
        @click="register"
        :loading="loading"
      />

      <div class="text-center q-mt-md">
        Já tem conta?
        <router-link to="/">Entrar</router-link>
      </div>
    </q-card>
  </q-page>
  </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";

const name = ref("");
const email = ref("");
const password = ref("");
const loading = ref(false);

const $q = useQuasar();
const router = useRouter();

async function register() {
  if (!name.value || !email.value || !password.value) {
    $q.notify({ type: "negative", message: "Preencha todos os campos" });
    return;
  }

  try {
    loading.value = true;

    await api.post("/users", {
      name: name.value,
      email: email.value,
      password: password.value,
    });

    $q.notify({
      type: "positive",
      message: "Conta criada com sucesso!",
    });

    router.push("/login");

  } catch (err) {
    console.error(err);
    $q.notify({
      type: "negative",
      message: err.response?.data?.message || "Erro ao criar conta",
    });

  } finally {
    loading.value = false;
  }
}
</script>

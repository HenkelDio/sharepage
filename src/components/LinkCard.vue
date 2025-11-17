<template>
  <q-card class="q-pa-md q-mb-md bg-primary text-white cursor-pointer"
          @click="open">
    <div class="text-center">{{ label }}</div>
  </q-card>
</template>

<script setup>
const props = defineProps({
  label: String,
  url: String
})

function open() {
  let url = props.url;

  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = 'https://' + url;
  }

  window.open(url, '_blank');
}
</script>

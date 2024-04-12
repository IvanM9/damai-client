<template>
  <!-- <VitePwaManifest /> -->
  <NuxtPwaManifest />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div v-show="$pwa?.needRefresh">
    <span>
      Nuevo contenido disponible, recargue la página.
    </span>

    <button @click="$pwa?.updateServiceWorker()">
      Recargar
    </button>
  </div>
</template>
<script setup lang="ts">
const { $pwa } = useNuxtApp()
// const layout = ref('default')

// import { watch } from 'vue'
// import { useRoute } from 'vue-router'

// const route = useRoute()

// watch(route, (to, from) => {
//   // Aquí puedes manejar los cambios de ruta
//   console.log('Cambiando de ruta', to.path, from.path)
//   if (to.path.includes('inquilinos')) {
//     layout.value = 'other'
//   }
// })

onMounted(() => {
  if ($pwa?.offlineReady)
    alert('App ready to work offline')
})
</script>

<template>
  <!-- <VitePwaManifest /> -->
  <NuxtPwaManifest />
  <div class="fixed inset-0 flex overflow-hidden">
    <Navigator class="flex-col items-stretch relative w-full border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 lg:w-[--width] flex-shrink-0 hidden lg:flex" />
    <UContainer class="flex flex-1 w-full min-w-0 overflow-y-auto" >
      <div class="flex-col items-stretch relative w-full flex-1 flex">
        <NuxtPage />
      </div>
    </UContainer>
  </div>
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

onMounted(() => {
  if ($pwa?.offlineReady)
    alert('App ready to work offline')
})
</script>


<script setup lang="ts">

const links = [{
  label: 'Inicio',
  to: '/',
  icon: 'i-heroicons-home'
}, {
  label: 'Inquilinos',
  icon: 'i-heroicons-user-group',
  to: '/inquilinos'
}, {
  label: 'Departamentos',
  icon: 'i-heroicons-home',
  to: '/departamentos'
}, {
  label: 'Pagos',
  icon: 'i-heroicons-currency-dollar',
  to: '/pagos'
}]
</script>

<template>

  <div class="fixed inset-0 flex overflow-hidden">
    <div
      class="flex-col items-stretch relative w-full border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 lg:w-[--width] flex-shrink-0 hidden lg:flex shadow-lg shadow-indigo-500/40 bg-tasman-500 dark:bg-ship-gray-800 h-screen">
      <header>
        <div class="flex items-center justify-between w-full p-4">
          <div class="flex items-center">
            <!-- <img src="/path/to/logo.png" alt="Logo" class="w-8 h-8 mr-2"> -->
            <h1 class="text-white dark:text-white text-lg font-bold">Damai</h1>
          </div>
        </div>
      </header>
      <UContainer :ui="{padding:'px-1 lg:px-1'}">
      <UVerticalNavigation :links="links" :ui="{
        size: 'text-lg', padding: 'px-5 py-3',
        inactive: 'text-white dark:text-white hover:text-gray-700 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50',
        icon: {
          inactive: 'text-white dark:text-white',
        },
      }" class="" />
      </UContainer>
    </div>
    <div class="grid grid-flow-row auto-rows-max flex-1 min-w-0 w-full overflow-y-auto ">
      <UHeader class="bg-tasman-500 dark:bg-ship-gray-800 max-h-10 py-3">
        <div class="flex items-center justify-between w-full">
          <div class="flex items-center">
            <h1 class="text-white
            dark:text-white ml-3">Inmobiliaria</h1>
          </div>
        </div>
      </UHeader>
      <UContainer class="w-full mt-1">
        <div class="flex-col items-stretch relative w-full flex-1 flex">
          <slot />
        </div>
      </UContainer>
    </div>
  </div>

</template>
<style scoped>
.navigation {
  width: 200px;
  /* Ajusta este valor según tus necesidades */
}

.container {
  flex-grow: 1;
}
</style>
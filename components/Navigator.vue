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
  <UVerticalNavigation :links="links" :ui="{
    size: 'text-lg', padding: 'px-5 py-3',
    inactive: 'text-white dark:text-white hover:text-gray-700 dark:hover:text-white hover:before:bg-gray-50 dark:hover:before:bg-gray-800/50',
    icon: {
      inactive: 'text-white dark:text-white',
    },
  }" class="navigation shadow-lg shadow-indigo-500/40 bg-tasman-500 dark:bg-ship-gray-800" />
</template>
<style>
.flex-container {
  display: flex;
  height: 100vh;
}

.navigation {
  width: 200px;
  /* Ajusta este valor según tus necesidades */
}

.container {
  flex-grow: 1;
}
</style>
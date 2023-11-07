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
    <UVerticalNavigation  :links="links" class="navigation shadow-lg shadow-indigo-500/40 pt-3"/>
</template>
<style>
.flex-container {
  display: flex;
  height: 100vh;
}

.navigation {
  width: 200px; /* Ajusta este valor según tus necesidades */
}

.container {
  flex-grow: 1;
}
</style>
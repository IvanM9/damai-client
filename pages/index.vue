<template>
  <!-- <Navigator  /> -->
  <!-- <UBreadcrumb :links="links" :ui="{ ol: 'gap-x-3', li: 'gap-x-3' }">
      <template #divider>
        <span class="w-8 h-1 rounded-full bg-gray-300 dark:bg-gray-700" />
      </template>
</UBreadcrumb> -->
  <!-- <nav class="text-gray-500">
    <ul class="flex">
      <li v-for="(link, index) in links" :key="index" class="mr-2">
        <ULink :to="link.to" class="text-blue-500 hover:text-blue-700">{{ link.label }}</ULink>
        <span v-if="index !== links.length - 1" class="mx-2">></span>
      </li>
    </ul>
  </nav> -->
  <div class="flex flex-col items-center pt-4">
    <div class="grid grid-cols-2 gap-5 justify-items-center w-auto">
      <ULink to="/inquilinos">
        <UCard class="w-80 h-auto"
          :ui="{ header: { background: 'bg-tasman-400', padding: 'py-10' }, background: 'bg-white dark:bg-gray-900', base: 'p-0' }">
          <template #header>
            <!-- <h2 class="text-lg font-semibold">Inquilinos</h2> -->
          </template>
          <h2 class="text-lg font-semibold">Inquilinos</h2>
          Esta opción permite gestionar los inquilinos de los departamentos.
        </UCard>
      </ULink>
      <ULink to="/departamentos">
        <UCard class="w-80 h-auto"
          :ui="{ header: { background: 'bg-tasman-400', padding: 'py-10' }, background: 'bg-white dark:bg-gray-900' }">
          <template #header>
            <!-- <h2 class="text-lg font-semibold">Inquilinos</h2> -->
          </template>
          <h2 class="text-lg font-semibold">Departamentos</h2>
          Esta opción permite gestionar los departamentos.
        </UCard>
      </ULink>
      <ULink to="/pagos">
        <UCard class="w-80 h-auto"
          :ui="{ header: { background: 'bg-tasman-400', padding: 'py-10' }, background: 'bg-white dark:bg-gray-900' }">
          <template #header>
            <!-- <h2 class="text-lg font-semibold">Inquilinos</h2> -->
          </template>
          <h2 class="text-lg font-semibold">Pagos</h2>
          Esta opción permite gestionar los pagos de los inquilinos.
        </UCard>
      </ULink>
    </div>
  </div>

</template>
<script setup lang="ts">
const links = [{
  label: 'Home',
  icon: 'i-heroicons-home',
  to: '/'
}, {
  label: 'Navigation',
  icon: 'i-heroicons-square-3-stack-3d',
  to: '/inquilinos'
}, {
  label: 'Breadcrumb',
  icon: 'i-heroicons-link',
  to: '/departamentos'

}]

</script>

<template>
    <div class="flex-container">
        <!-- <Navigator /> -->
        <!-- <UContainer class="container">
        <h2>Departamento # {{ $router.currentRoute.value.params['id'] }}</h2>
        </UContainer> -->
        <DepartamentoComponent :is-edit="true" :apartment-data="data" />
    </div>
</template>
<script setup lang="ts">
import axios from 'axios'
const runtimeConfig = useRuntimeConfig();
const route = useRoute();
const data = Object.assign({ id: route.params['id'] }, (await axios.get(`${runtimeConfig.public.API_URL}/apartment/${route.params['id']}`)).data);

</script>

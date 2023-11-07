<template>
    <div class="flex-container">
        <Navigator />
        <UContainer class="container">
        <h2>Departamento # {{ $router.currentRoute.value.params['id'] }}</h2>
        </UContainer>
    </div>
</template>
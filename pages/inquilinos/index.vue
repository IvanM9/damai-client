<template>
    <div class="flex-container">
        <Navigator />

        <!-- Contenedor -->
        <UContainer class="container mt-4">
            <div class="flex flex-col items-end justify-end gap-3">
                <UButton color="white" variant="solid" label="Agregar" to="/inquilinos/nuevo" />
            </div>
            <UCard class="mt-2">
                <template #header>
                    <h1>
                        Lista de inquilinos
                    </h1>
                </template>

                <UTable :columns="columns" :rows="tenants">
                    <template #actions-data="{ row }">
                        <UDropdown :items="items(row)">
                            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                        </UDropdown>
                    </template>
                </UTable>

            </UCard>
        </UContainer>

        <!-- Modal -->
        <UModal v-model="isOpen" prevent-close>
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Datos del departamento
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="isOpen = false" />
                    </div>
                </template>

                <div class="flex flex-col items-start justify-start gap-3">
                    <UFormGroup>
                        <template #label>
                            <p class="font-bold dark:text-gray-200">
                                Nombres
                            </p>
                        </template>
                        <p class="">{{ tenantData.firstName }}</p>
                    </UFormGroup>

                    <UFormGroup v-if="tenantData.lastName">
                        <template #label>
                            <p class="font-bold dark:text-gray-200">
                                Apellidos
                            </p>
                        </template>
                        <p class="">{{ tenantData.lastName }}</p>
                    </UFormGroup>

                    <UFormGroup v-if="tenantData.phone">
                        <template #label>
                            <p class="font-bold dark:text-gray-200">
                                Número de télefono
                            </p>
                        </template>
                        <p> {{ tenantData.phone }}</p>
                    </UFormGroup>

                    <UFormGroup v-if="tenantData.email">
                        <template #label>
                            <p class="font-bold dark:text-gray-200">
                                Correo electrónico
                            </p>
                        </template>
                        <p> {{ tenantData.email }}</p>
                    </UFormGroup>

                    <UFormGroup v-if="tenantData.identification">
                        <template #label>
                            <p class="font-bold dark:text-gray-200">
                                Número de cédula
                            </p>
                        </template>
                        <p> {{ tenantData.identification }}</p>
                    </UFormGroup>

                    <UFormGroup v-if="tenantData.description">
                        <template #label>
                            <p class="font-bold dark:text-gray-200">
                                Descripción
                            </p>
                        </template>
                        <p> {{ tenantData.description }}</p>
                    </UFormGroup>

                    <UFormGroup>
                        <template #label>
                            <p class="font-bold dark:text-gray-200">
                                Creado el
                            </p>
                        </template>
                        <p> {{ tenantData.createdAt }}</p>
                    </UFormGroup>
                    <UFormGroup v-if="tenantData.updatedAt">
                        <template #label>
                            <p class="font-bold dark:text-gray-200">
                                Modificado el
                            </p>
                        </template>
                        <p> {{ tenantData.updatedAt }}</p>
                    </UFormGroup>
                </div>
            </UCard>
        </UModal>
    </div>
</template>
  
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'

const columns = [{
    key: 'index',
    label: '#'
}, {
    key: 'fullName',
    label: 'Inquilino',
    sortable: true
}, {
    key: 'phone',
    label: 'N. de teléfono'
}, {
    key: 'isActive',
    label: '¿Activo?',
    sortable: true
}, {
    key: 'description',
    label: 'Descripción',
},
{
    key: 'actions'
}
]
const runtimeConfig = useRuntimeConfig();
const route = useRouter();

const isOpen = ref(false);
const tenantData = ref({
    firstName: '',
    lastName: '',
    phone: 0,
    identification: false,
    description: '',
    email: '',
    createdAt: '',
    updatedAt: '',
});

const tenants = ref([]);
async function getTenants() {
    const data: never[] = (await axios.get(`${runtimeConfig.public.API_URL}/tenant`)).data;

    let index = 0;
    tenants.value = data.map((tenant: any) => {
        tenant.index = ++index;
        tenant.isActive = tenant.isActive ? 'Si' : 'No';
        tenant.fullName = `${tenant.firstName} ${tenant.lastName ?? ''}`;
        return tenant;
    })
}

onMounted(async () => {
    await getTenants()
})

function items(row: any) {
    return [
        [{
            label: 'Ver',
            icon: 'i-heroicons-eye-20-solid',
            click: async () => await getInfoById(row.id)
        }, {
            label: 'Editar',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => route.push(`/inquilinos/edit/${row.id}`)
        }, {
            label: 'Activar/Desactivar',
            icon: 'i-heroicons-exclamation-circle-20-solid',
            click: async () => await changeStatus(row.id)
        }]
    ]
}

async function getInfoById(id: number) {
    console.log(id)
    isOpen.value = true;
    tenantData.value = (await axios.get(`${runtimeConfig.public.API_URL}/tenant/${id}`)).data
}

async function changeStatus(id: number) {
    await axios.patch(`${runtimeConfig.public.API_URL}/tenant/update-status/${id}`)

    await getTenants()
}
</script>
  
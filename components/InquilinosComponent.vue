<template>
    <UContainer class="container mt-4">
        <div class="flex flex-col items-start justify-start">
            <UButton color="primary" label="Regresar" to="/inquilinos" />
        </div>
        <UCard class="mt-2">
            <template #header>
                <h1>
                    Registrar nuevo inquilino/a
                </h1>
            </template>
            <UForm @submit="onSubmit" :state="state">

                <UFormGroup label="Nombres" class="p-2" v-slot="{ error }" :error="!state.firstName">
                    <UInput name="firstName" v-model="state.firstName"
                        :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" :required="true" />
                </UFormGroup>

                <UFormGroup label="Apellidos" class="p-2">
                    <UInput name="firstName" v-model="state.lastName" />
                </UFormGroup>

                <UFormGroup label="Número de télefono" class="p-2">
                    <UInput name="phone" v-model="state.phone" />
                </UFormGroup>

                <UFormGroup label="Número de cédula" class="p-2">
                    <UInput name="identification" v-model="state.identification" />
                </UFormGroup>

                <UFormGroup label="Descripción" class="p-2">
                    <UTextarea name="description" v-model="state.description" />
                </UFormGroup>

                <UButton type="submit" label="Guardar" class="p-2 mt-2" color="gray" />
            </UForm>
        </UCard>

        <UNotifications />
    </UContainer>
    <UModal v-model="isOpen">
        <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
            <template #header>
                <div class="flex items-center justify-between">
                    <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                        ¿Crear contrato?
                    </h3>
                    <UButton color="gray" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                        @click="isOpen = false" />
                </div>
            </template>

            <ContratoComponent :tenant-id="newTenant"/>
        </UCard>
    </UModal>
</template>
<script setup lang="ts">
import type { FormSubmitEvent } from '#ui/types'
import axios from 'axios'

const promp = defineProps({
    tenantData: {
        type: Object,
        required: false
    },
    isEdit: {
        type: Boolean,
        required: true
    }
})

const newTenant = ref(0)

const state = reactive({
    firstName: promp.tenantData?.firstName ?? undefined,
    lastName: promp.tenantData?.lastName ?? undefined,
    phone: promp.tenantData?.phone ?? undefined,
    identification: promp.tenantData?.identification ?? undefined,
    email: promp.tenantData?.email ?? undefined,
    description: promp.tenantData?.description ?? undefined
})

const toast = useToast()
const runtimeConfig = useRuntimeConfig()

const isOpen = ref(false);

async function onSubmit(event: FormSubmitEvent<any>) {
    console.log(event.data)
    let url = !promp.isEdit ? `${runtimeConfig.public.API_URL}/tenant` : `${runtimeConfig.public.API_URL}/tenant/update/${promp.tenantData?.id}`

    await axios({
        method: promp.isEdit ? 'PUT' : 'POST',
        url: url,
        data: event.data,
        headers: {
            'Content-Type': 'application/json'
        },
    }).then((res) => {
        toast.add({
            title: 'Success',
            description: `Inquilino ${promp.isEdit ? 'actualizado' : 'creado'}`,
            timeout: 5000,
            color: 'green',
        })
        if (!promp.isEdit) {
            newTenant.value = res.data.id
            changeModal()
        }
    }).catch((error) => {
        toast.add({
            title: 'Error',
            description: `Error al ${promp.isEdit ? 'actualizar' : 'crear'} inquilino`,
            timeout: 5000,
            color: 'red',
        })
    })
}

function changeModal() {
    isOpen.value = !isOpen.value;
    console.log(isOpen.value)
}
</script>
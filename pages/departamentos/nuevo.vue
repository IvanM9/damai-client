<template>
    <div class="flex-container">
        <Navigator />

        <!-- <UContainer class="container mt-4">
            <div class="flex flex-col items-start justify-start">
                <UButton color="white" variant="solid" label="Regresar" to="/departamentos" />
            </div>
            <UCard class="mt-2">
                <template #header>
                    <h1>
                        Ingresar nuevo departamento
                    </h1>
                </template>
                <UForm :schema="schema" @submit="onSubmit" :state="state">

                    <UFormGroup label="Nombre" class="p-2">
                        <UInput name="name" v-model="state.name" />
                    </UFormGroup>

                    <UFormGroup label="Número de dormitorios" class="p-2">
                        <UInput name="numberOfRooms" v-model="state.numberOfRooms" />
                    </UFormGroup>

                    <UFormGroup label="Precio mensual" class="p-2">
                        <UInput name="monthlyRent" v-model="state.monthlyRent" />
                    </UFormGroup>

                    <UFormGroup label="Descripción" class="p-2">
                        <UTextarea name="description" v-model="state.description" />
                    </UFormGroup>

                    <UFormGroup label="¿Ocupado?" class="p-2">
                        <UCheckbox name="busy" label="¿Si o No?" v-model="state.busy" />
                    </UFormGroup>

                    <UButton type="submit" label="Guardar" class="p-2 mt-2" />
                </UForm>
            </UCard>
            <UNotifications />
        </UContainer> -->
        <DepartamentoComponent :is-edit="false" />
    </div>
</template>
<!-- <script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'


const schema = Joi.object({
    name: Joi.string().required(),
    numberOfRooms: Joi.number().required(),
    monthlyRent: Joi.string().required(),
    busy: Joi.boolean(),
    description: Joi.string()
})

const state = reactive({
    name: undefined,
    numberOfRooms: undefined,
    monthlyRent: "0,00",
    busy: false,
    description: undefined
})
const toast = useToast()
const runtimeConfig = useRuntimeConfig()

async function onSubmit(event: FormSubmitEvent<any>) {
    // Do something with event.data
    await $fetch(`${runtimeConfig.public.API_URL}/apartment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event.data),
        onResponse: (response) => {
            console.log(response)
            if (response.response.status === 400) {
                toast.add({
                    title: 'Error',
                    description: response.response._data?.message,
                    timeout: 5000,
                    color: 'red',
                })
            } else
                toast.add({
                    title: 'Success',
                    description: 'Departamento creado con éxito',
                    timeout: 5000,
                    color: 'green',
                })
        }
    })
}
</script> -->
<template>
    <div class="flex-container">
        <Navigator />

        <UContainer class="container mt-4">
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

                    <UFormGroup label="Nombre" class="p-4" >
                        <UInput name="name" v-model="state.name" />
                    </UFormGroup>

                    <UFormGroup label="Número de dormitorios" class="p-4">
                        <UInput name="numberOfRooms" v-model="state.numberOfRooms" />
                    </UFormGroup>

                    <UFormGroup label="Precio mensual" class="p-4" >
                        <UInput name="monthlyRent" v-model="state.monthlyRent" />
                    </UFormGroup>

                    <UFormGroup label="Descripción" class="p-4">
                        <UTextarea name="description" v-model="state.description" />
                    </UFormGroup>

                    <UFormGroup label="¿Ocupado?" class="p-4">
                        <UCheckbox name="busy" label="¿Si o No?" v-model="state.busy" />
                    </UFormGroup>

                    <UButton type="submit" label="Guardar" class="p-4" />
                </UForm>
            </UCard>
        </UContainer>
    </div>
</template>
<script setup lang="ts">
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

async function onSubmit(event: FormSubmitEvent<any>) {
    // Do something with event.data
    console.log(event.data)
    await $fetch('http://localhost:4000/api/apartment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event.data),
        onRequestError: (error) => {
            console.log(error.error.message)
        }
    })
}
</script>
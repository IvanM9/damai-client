<template>
    <UContainer class="container mt-4">
        <div class="flex flex-col items-start justify-start">
            <UButton color="white" variant="solid" label="Regresar" to="/departamentos" />
        </div>
        <UCard class="mt-2">
            <template #header>
                <h1>
                    Registrar nuevo departamento
                </h1>
            </template>
            <UForm :schema="schema" @submit="onSubmit" :state="state">

                <UFormGroup label="Nombre" class="p-2" v-slot="{ error }" :error="!state.name">
                    <UInput name="name" v-model="state.name"
                        :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" />
                </UFormGroup>

                <UFormGroup label="Número de dormitorios" class="p-2" v-slot="{ error }" :error="!state.numberOfRooms">
                    <UInput name="numberOfRooms" v-model="state.numberOfRooms"
                        :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" type="number" />
                </UFormGroup>

                <UFormGroup label="Precio mensual" class="p-2" v-slot="{ error }" :error="!state.monthlyRent">
                    <UInput name="monthlyRent" v-model="state.monthlyRent"
                        :trailing-icon="error ? 'i-heroicons-exclamation-triangle-20-solid' : undefined" />
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
    </UContainer>
</template>
<script setup lang="ts">
import Joi from 'joi'
import type { FormSubmitEvent } from '#ui/types'
import axios from 'axios'

const promp = defineProps({
    apartmentData: {
        type: Object,
        required: false
    },
    isEdit: {
        type: Boolean,
        required: true
    }
})

const schema = Joi.object({
    name: Joi.string(),
    numberOfRooms: Joi.number(),
    monthlyRent: Joi.string(),
    busy: Joi.boolean(),
    description: Joi.optional()
})

const state = reactive({
    name: promp.apartmentData?.name ?? undefined,
    numberOfRooms: promp.apartmentData?.numberOfRooms ?? undefined,
    monthlyRent: promp.apartmentData?.monthlyRent ?? "0,00",
    busy: promp.apartmentData?.busy ?? false,
    description: promp.apartmentData?.description ?? undefined
})

const toast = useToast()
const runtimeConfig = useRuntimeConfig()

async function onSubmit(event: FormSubmitEvent<any>) {
    console.log(event.data)
    let url = !promp.isEdit ? `${runtimeConfig.public.API_URL}/apartment` : `${runtimeConfig.public.API_URL}/apartment/update/${promp.apartmentData?.id}`

    await axios({
        method: promp.isEdit ? 'PUT' : 'POST',
        url: url,
        data: event.data,
        headers: {
            'Content-Type': 'application/json'
        },
    }).catch((error) => {
        toast.add({
            title: 'Error',
            description: error.message,
            timeout: 5000,
            color: 'red',
        })
    })

    toast.add({
        title: 'Success',
        description: 'Departamento creado con éxito',
        timeout: 5000,
        color: 'green',
    })
}
</script>
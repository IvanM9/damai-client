<template>
    <UCard>
        <UForm @submit="onSubmit" :state="state">
            <div class="grid gap-4 grid-cols-2">
                <div>
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-calendar-days-20-solid" label="Fecha de inicio" />
                        <template #panel="{ close }">
                            <VCalendarDatePicker v-model="state.startDate" transparent borderless title-position="left"
                                trim-weeks :first-day-of-week="2" @close="close" />
                        </template>
                    </UPopover>
                </div>
                <div>
                    <UPopover :popper="{ placement: 'bottom-start' }">
                        <UButton icon="i-heroicons-calendar-days-20-solid" label="Fecha de fin" />
                        <template #panel="{ close }">
                            <VCalendarDatePicker v-model="state.endDate" transparent borderless title-position="left"
                                trim-weeks :first-day-of-week="2" @close="close" />
                        </template>
                    </UPopover>
                </div>
                <div>
                    <UFormGroup label="Valor del alquiler" class="p-2">
                        <UInput name="monthlyRent" v-model="state.monthlyRent" type="number" />
                    </UFormGroup>
                </div>
                <div>
                    <UFormGroup label="Selecione el apartamento" class="p-2">
                        <USelect :options="apartments" v-model="selectedApartment" @change="selectFilter" :required="true" />
                    </UFormGroup>
                </div>
            </div>

            <UFormGroup label="Descripción" class="p-2">
                <UTextarea name="description" v-model="state.description" />
            </UFormGroup>

            <UButton type="submit" label="Guardar" class="p-2 mt-2" />
        </UForm>
    </UCard>
</template>
<script setup lang="ts">
import { ref, reactive } from 'vue'
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'
import { onMounted } from 'vue'
import axios from 'axios'

const route = useRouter();
const runtimeConfig = useRuntimeConfig();
const promp = defineProps({
    tenantId: {
        type: Number,
        required: true
    }
})

const state = reactive({
    startDate: new Date(),
    endDate: undefined,
    monthlyRent: '',
    description: undefined,
    apartmentId: undefined,
    tenantId: promp.tenantId ?? undefined,
})



const apartments = ref<any>([])
const selectedApartment = ref(apartments.value[0])
const toast = useToast()

async function onSubmit() {
    state.startDate = state.startDate.toISOString()
    state.endDate = state.endDate?.toISOString()
    console.log(state)
    await axios.post(runtimeConfig.public.API_URL +'/lease', state).then((response) => {
        toast.add({
            title: 'success',
            description: 'El contrato se ha creado correctamente',
            timeout: 3000
        })
        route.push('/inquilinos')
    }).catch((error) => {
        console.log(error)
        toast.add({
            title: 'error',
            description: 'Ha ocurrido un error al crear el contrato',
            timeout: 3000,
            color: 'red'
        })
    })
}


async function selectFilter(value: any) {
    state.apartmentId = value.srcElement.value
}

onMounted(async () => {
    const { data } = await axios.get(runtimeConfig.public.API_URL + '/apartment?busy=false')
    apartments.value = data.map((apartment: any) => {
        return {
            label: apartment.name,
            value: apartment.id
        }
    })
})
</script>

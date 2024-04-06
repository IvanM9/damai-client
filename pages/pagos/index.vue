
<template>
    <div class="flex-container">
        <!-- <Navigator /> -->
        <UContainer class="container">
            <UCard class="mt-2 bg-tasman-50">
                <template #header>
                    <h1 class="flex justify-center mb-4">
                        Lista de pagos
                    </h1>
                    <USelect :options="paymentsFilter" @change="selectFilter" placeholder="Filtrar pagos" class="mb-3" />
                    <div class="container border-2" v-if="selectedFilter == 1">
                        <div class=" grid grid-cols-2">
                            <UFormGroup label="Año" class="p-2">
                                <UInput name="year" v-model="filters.year" type="text" />
                                <!-- <UButton label="Buscar"></UButton> -->
                            </UFormGroup>
                            <UFormGroup label="Mes" class="p-2">
                                <UInput name="month" v-model="filters.month" type="number" />
                            </UFormGroup>

                        </div>
                    </div>
                </template>

                <UTable :columns="columns" :rows="payments">
                    <template #actions-data="{ row }">
                        <UDropdown :items="items(row)">
                            <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                        </UDropdown>
                    </template>
                </UTable>

            </UCard>

        </UContainer>
    </div>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import axios from 'axios'
import { DatePicker as VCalendarDatePicker } from 'v-calendar'
import 'v-calendar/dist/style.css'

const runtimeConfig = useRuntimeConfig();
const route = useRouter();
const columns = [{
    key: 'index',
    label: '#'
}, {
    key: 'apartment',
    label: 'Apartamento',
    sortable: true
},
{
    key: 'tenant',
    label: 'Inquilino',
    sortable: true
},
{
    key: 'amount',
    label: 'Monto',
},
{
    key: 'date',
    label: 'Fecha',
},
{
    key: 'actions',
    label: 'Opciones'
}
]

const filters = ref({
    year: '',
    month: ''
})

const paymentsFilter = [{
    label: 'Todos los pagos',
    value: 0,
}, {
    label: 'Mostrar por año o por mes',
    value: 1
},
{
    label: 'Mostrar por inquilino',
    value: 2
},
{
    label: 'Mostrar por apartamento',
    value: 3
},
{
    label: 'Mostrar por contrato',
    value: 4
},]
const selectedFilter = ref(0)
async function selectFilter(value: any) {
    console.log(value.srcElement.value)
    selectedFilter.value = value.srcElement.value
    await getPayments();
}

onMounted(async () => {
    await getPayments()
})

const payments = ref([]);

function items(row: any) {
    return [
        [{
            label: 'Ver',
            icon: 'i-heroicons-eye-20-solid',
            //   click: async () => await getInfoById(row.id)

        }, {
            label: 'Editar',
            icon: 'i-heroicons-pencil-square-20-solid',
            click: () => route.push(`/departamentos/edit/${row.id}`)
        }, {
            label: 'Ver Pagos',
            icon: 'i-heroicons-eye-20-solid',
            // click: async () => await getPaymentsById(row.id)
        },
        {
            label: 'Activar/Desactivar',
            icon: 'i-heroicons-exclamation-circle-20-solid',
            //   click: async () => await changeStatus(row.id)
        }]
    ]
}

async function getPayments() {
    let index = 0;
    switch (Number(selectedFilter.value)) {
        case 0:
            index = 0;
            payments.value =
                (await axios.get(`${runtimeConfig.public.API_URL}/payment`)).data.map((payment: any) => {
                    payment.index = ++index;
                    payment.tenant = `${payment.lease.tenant.firstName} ${payment.lease.tenant.lastName}`;
                    payment.apartment = payment.lease.apartment.name;
                    return payment;
                })
            break;
        case 1:
                await getPaymentsByYearOrMonth();
            break;
        default:
            break;
    }
}

async function getPaymentsByYearOrMonth() {
    let index = 0;
    const queryYear = filters.value.year ? `?year=${filters.value.year}` : '';

    let queryMonth = ''
    if (filters.value.year && filters.value.month)
        queryMonth = `&month=${filters.value.month}`;
    else if (filters.value.month)
        queryMonth = `?month=${filters.value.month}`;

    payments.value =
        (await axios.get(`${runtimeConfig.public.API_URL}/payment/by-date${queryYear}${queryMonth}`))
            .data.payments.map((payment: any) => {
                payment.index = ++index;
                payment.tenant = `${payment.tenantFirstName} ${payment.tenantLastName}`;
                payment.apartment = payment.apartmentName;
                return payment;
            })
}

</script>
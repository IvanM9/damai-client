<template>
  <div class="flex-container">
    <!-- <Navigator /> -->

    <!-- Contenedor -->
    <UContainer class="container mt-4">
      <div class="flex flex-col items-end justify-end gap-3">
        <UButton  variant="solid" label="Agregar" to="/departamentos/nuevo" />
      </div>
      <UCard class="mt-2 ">
        <template #header>
          <h1>
            Lista de departamentos
          </h1>
        </template>

        <USelect :options="statusFilter" @change="getApartments" v-model="selectedStatus" placeholder="Activos/Inactivos" />

        <UTable :columns="columns" :rows="apartments">
          <template #actions-data="{ row }">
            <UDropdown :items="items(row)">
              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
            </UDropdown>
          </template>
        </UTable>

      </UCard>
    </UContainer>

    <!-- Modal -->
    <UModal v-model="isOpen">
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
                Nombre
              </p>
            </template>
            <p class="">{{ apartmentData.name }}</p>
          </UFormGroup>

          <UFormGroup>
            <template #label>
              <p class="font-bold dark:text-gray-200">
                Número de dormitorios
              </p>
            </template>
            <p> {{ apartmentData.numberOfRooms }}</p>
          </UFormGroup>

          <UFormGroup>
            <template #label>
              <p class="font-bold dark:text-gray-200">
                Precio mensual
              </p>
            </template>
            <p> ${{ apartmentData.monthlyRent }}</p>
          </UFormGroup>

          <UFormGroup v-if="apartmentData.description">
            <template #label>
              <p class="font-bold dark:text-gray-200">
                Descripción
              </p>
            </template>
            <p> {{ apartmentData.description }}</p>
          </UFormGroup>

          <UFormGroup>
            <template #label>
              <p class="font-bold dark:text-gray-200">
                ¿Ocupado?
              </p>
            </template>
            <p> {{ apartmentData.busy ? "Sí" : "No" }}</p>
          </UFormGroup>

          <UFormGroup v-if="apartmentData.busy && apartmentData.leases[0]">
            <template #label>
              <p class="font-bold dark:text-gray-200">
                Inquilino
              </p>
            </template>
            <p> {{ `${apartmentData.leases[0]?.tenant?.firstName} ${apartmentData.leases[0]?.tenant?.lastName}` }}</p>
          </UFormGroup>

          <UFormGroup>
            <template #label>
              <p class="font-bold dark:text-gray-200">
                Creado el
              </p>
            </template>
            <p> {{ apartmentData.createdAt }}</p>
          </UFormGroup>
          <UFormGroup v-if="apartmentData.updatedAt">
            <template #label>
              <p class="font-bold dark:text-gray-200">
                Modificado el
              </p>
            </template>
            <p> {{ apartmentData.updatedAt }}</p>
          </UFormGroup>
        </div>
      </UCard>
    </UModal>

    <UModal v-model="openPayments" :ui="{width: 'sm:max-w-xl'}">
            <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
                <template #header>
                    <div class="flex items-center justify-between">
                        <h3 class="text-base font-semibold leading-6 text-gray-900 dark:text-white">
                            Pagos recibidos para este apartamento
                        </h3>
                        <UButton color="gray" variant="ghost" icon="i-heroicons-x-mark-20-solid" class="-my-1"
                            @click="openPayments = false" />
                    </div>
                </template>
                <div class="overflow-y-auto">
                  <UTable :columns="columnsPayments" :rows="paymentData">
                      <template #actions-data="{ row }">
                          <UDropdown :items="items(row)">
                              <UButton color="gray" variant="ghost" icon="i-heroicons-ellipsis-horizontal-20-solid" />
                          </UDropdown>
                      </template>
                  </UTable>
                </div>
                <template #footer >
                    <div class="flex items-center">
                        Se ha obtenido un total de ${{ totalPayment }} en este apartamento
                    </div>
                </template>

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
  key: 'name',
  label: 'Nombre',
  sortable: true
}, {
  key: 'numberOfRooms',
  label: 'Dormitorios'
}, {
  key: 'monthlyRent',
  label: 'Precio'
}, {
  key: 'busy',
  label: 'Ocupado',
  sortable: true
},
// {
//   key: 'description',
//   label: 'Descripción'
// }, 
{
  key: 'actions',
  label: 'Opciones'
}
]
const runtimeConfig = useRuntimeConfig();
const route = useRouter();

const isOpen = ref(false);
const apartmentData = ref({
  name: '',
  numberOfRooms: 0,
  monthlyRent: 0,
  busy: false,
  description: '',
  createdAt: '',
  updatedAt: '',
  leases: [
    {
      id: 0,
      startDate: '',
      endDate: '',
      tenant: {
        firstName: '',
        lastName: '',
      }
    }
  ]
});

const paymentData = ref([{}])
const openPayments = ref(false);
const totalPayment = ref(0);
const columnsPayments = [{
    key: 'index',
    label: '#'
    },
    {
    key: 'tenant',
    label: 'Inquilino'
    },{
    key: 'amount',
    label: 'Monto'
    },
    {
    key: 'date',
    label: 'Fecha de pago'
    },
]

const statusFilter = [{
  label: 'Activos',
  value: true,
}, {
  label: 'Inactivos',
  value: false
}]

const selectedStatus = ref(true);

const apartments = ref([]);
async function getApartments() {
  const data: never[] = (await axios.get(`${runtimeConfig.public.API_URL}/apartment?status=${selectedStatus.value}`)).data;

  let index = 0;
  apartments.value = data.map((apartment: any) => {
    apartment.index = ++index;
    apartment.monthlyRent = `$${apartment.monthlyRent}`
    apartment.busy = apartment.busy ? 'Si' : 'No'
    return apartment;
  })
}

onMounted(async () => {
  await getApartments()
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
      click: () => route.push(`/departamentos/edit/${row.id}`)
    }, {
            label: 'Ver Pagos',
            icon: 'i-heroicons-eye-20-solid',
            click: async () => await getPaymentsById(row.id)
    }, 
    {
      label: 'Activar/Desactivar',
      icon: 'i-heroicons-exclamation-circle-20-solid',
      click: async () => await changeStatus(row.id)
    }]
  ]
}

async function getInfoById(id: number) {
  console.log(id)
  isOpen.value = true;
  apartmentData.value = (await axios.get(`${runtimeConfig.public.API_URL}/apartment/${id}`)).data
}

async function changeStatus(id: number) {
  await axios({
    method: 'PATCH',
    url: `${runtimeConfig.public.API_URL}/apartment/update-status/${id}`
  })

  await getApartments()
}

async function getPaymentsById(id: number) {
    openPayments.value = true;

    const data = (await axios.get(`${runtimeConfig.public.API_URL}/payment/apartment/${id}`)).data
    totalPayment.value = data.totalPayments;
    let index = 0;
    paymentData.value = data.data.map((payment: any)=>{
        payment.index = ++index;
        payment.tenant = `${payment.tenantFirstName} ${payment.tenantLastName}`
        return payment;
    })
}
</script>

<template>
  <div class="flex-container">
    <Navigator />

    <!-- Contenedor -->
    <UContainer class="container mt-4">
      <div class="flex flex-col items-end justify-end gap-3">
          <UButton color="white" variant="solid" label="Agregar" to="/departamentos/nuevo" />
        </div>
      <UCard class="mt-2">
        <template #header>
          <h1>
            Lista de departamentos
          </h1>
        </template>
        <UTable :columns="columns" :rows="apartments" />
        
      </UCard>
    </UContainer>
  </div>
</template>

<script lang="ts">
export default {
  data: () => ({
    apartments: [],
    columns: [{
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
    {
      key: 'description',
      label: 'Descripción'
    }
    ]
  }),
  async mounted() {
    await this.getApartments()
  },
  methods: {
    async getApartments() {
      const data: never[] = await $fetch('http://localhost:4000/api/apartment?busy=true')
      let index = 0;
      this.apartments = data.map((apartment: any) => {
        apartment.index = ++index;
        apartment.busy = apartment.busy ? 'Si' : 'No'
        return apartment;
      })
    }
  }
}
</script>
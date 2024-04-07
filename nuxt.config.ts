// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,

    timeline: {
      enabled: true
    }
  },
  modules: ['@nuxt/ui', '@vite-pwa/nuxt'],
  runtimeConfig: {
    public: {
      API_URL: 'http://localhost:4000/api'
    }
  },
  pwa: {
    manifest: {
      name: 'My Nuxt App',
      short_name: 'My Nuxt App',
      lang: 'es'
    }
  }
})
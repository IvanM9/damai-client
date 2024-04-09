// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process'

const sw = process.env.SW === 'true'
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
    strategies: sw ? 'injectManifest' : 'generateSW',
    srcDir: sw ? 'service-worker' : undefined,
    filename: sw ? 'sw.ts' : undefined,
    registerType: 'autoUpdate',
    manifest: {
      name: 'Damai Apartments',
      short_name: 'Damai',
      lang: 'es',
      display: 'standalone',
      theme_color: '#678265',
      icons: [
        {
          src: 'logo_damai.jpg',
          sizes: '1024x1024',
          type: 'image/jpg',
        },
      ],
    }
  }
})

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2026-06-30",

  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/hints",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@tresjs/nuxt",
    "@vueuse/nuxt",
  ],
  icon: {
    serverBundle: {
      collections: ["lucide", "simple-icons", "circle-flags"],
    },
  },
  devtools: {
    enabled: true,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {
    "/": { prerender: true },
    "/fr": { prerender: true },
  },

  i18n: {
    locales: [
      { code: "en", name: "English", language: "en-US" },
      { code: "fr", name: "French", language: "fr-FR" },
    ],
    defaultLocale: "en",
  },
});

export default defineNuxtConfig({
  compatibilityDate: "2026-06-30",
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxt/hints",
    "@nuxtjs/i18n",
    "@nuxtjs/seo",
    "@tresjs/nuxt",
    "@vueuse/nuxt",
  ],
  site: {
    url: "https://kaidosushibar.fr",
    name: "Kaido Sushi Bar",
  },

  icon: {
    serverBundle: {
      collections: ["lucide", "simple-icons", "circle-flags"],
    },
  },
  fonts: {
    families: [
      {
        name: "Satoshi",
        provider: "local",
        global: true,
      },
      { name: "Jost", provider: "google", weights: [300, 400], global: true },
    ],
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  routeRules: {
    "/": { prerender: true },
    "/en": { prerender: true },
  },
  i18n: {
    locales: [
      { code: "fr", name: "French", language: "fr-FR" },
      { code: "en", name: "English", language: "en-US" },
    ],
    defaultLocale: "fr",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
  },
});
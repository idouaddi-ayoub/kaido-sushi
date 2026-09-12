const siteUrl = process.env.NUXT_PUBLIC_SITE_URL || "http://localhost:3000";

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
  site: { url: siteUrl, name: "Kaido Sushi Bar" },
  linkChecker: {
    failOnError: true,
  },
  icon: {
    serverBundle: {
      collections: ["lucide", "simple-icons", "circle-flags"],
    },
    clientBundle: {
      scan: true,
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
  robots: {
    allow: "/",
    sitemap: ["/sitemap.xml"],
  },
  routeRules: {
    "/": { prerender: false },
    "/en": { prerender: false },
  },
  nitro: {
    prerender: {
      crawlLinks: false,
      routes: ["/", "/en"],
    },
  },
  i18n: {
    baseUrl: siteUrl,
    locales: [
      { code: "fr", name: "French", language: "fr-FR" },
      { code: "en", name: "English", language: "en-US" },
    ],
    defaultLocale: "fr",
    strategy: "prefix_except_default",
    detectBrowserLanguage: false,
  },
});

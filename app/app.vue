<script setup>
useHead({
  meta: [{ name: "viewport", content: "width=device-width, initial-scale=1" }],
  link: [{ rel: "icon", href: "/favicon.ico" }],
  htmlAttrs: {
    lang: "en",
  },
});
const { t, locale } = useI18n();
const localeHead = useLocaleHead();
useHead(localeHead);

useSeoMeta({
  title: () => t("home.seo.title"),
  description: () => t("home.seo.description"),
  ogImage: "/KAIDO_SUSHI.webp",
  ogType: "website",
  ogSiteName: "Kaido Sushi Bar",
  ogTitle: () => t("home.seo.title"),
  ogDescription: () => t("home.seo.description"),
  ogLocale: () => (locale.value === "fr" ? "fr_FR" : "en_US"),
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

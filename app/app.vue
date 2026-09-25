<script setup>
const { t } = useI18n();

useHead(useLocaleHead());

useHead({
  link: [{ rel: "icon", href: "/favicon.ico" }],
});

useSeoMeta({
  title: () => t("home.seo.title"),
  description: () => t("home.seo.description"),
  ogType: "website",
  ogSiteName: "Kaido Sushi Bar",
  ogTitle: () => t("home.seo.title"),
  ogDescription: () => t("home.seo.description"),
  twitterCard: "summary_large_image",
});

defineOgImage("KAIDO.takumi", {
  title: t("home.seo.title"),
  description: t("home.seo.description"),
});
</script>

<template>
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<template>
  <section id="place" class="grain relative bg-ardoise-950 py-24 sm:py-32">
    <div
      v-reveal
      class="mx-auto grid max-w-7xl items-center gap-14 px-6 transition-all duration-1000 ease-out sm:px-12 lg:grid-cols-2"
    >
      <div class="relative aspect-4/3 overflow-hidden">
        <NuxtImg
          src="/test.webp"
          :alt="t('home.place.imageAlt')"
          class="size-full object-cover"
          sizes="100vw lg:50vw"
          loading="lazy"
        />
        <div
          class="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cuivre-500/20"
        />
      </div>

      <div>
        <p class="font-display text-xs tracking-[0.24em] text-cuivre-400">
          {{ t("home.place.eyebrow") }}
        </p>
        <h2
          class="mt-3 font-display text-[clamp(1.85rem,4.5vw,2.75rem)] font-light leading-tight text-white"
        >
          {{ t("home.place.title") }}
        </h2>
        <p
          class="mt-6 max-w-md whitespace-pre-line leading-relaxed text-ardoise-300"
        >
          {{ t("home.place.body") }}
        </p>
        <span class="mt-8 block h-px w-16 bg-cuivre-500/50" />
      </div>
    </div>
  </section>
</template>

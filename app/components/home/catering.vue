<script setup lang="ts">
const { t } = useI18n();
const { phone } = useVenue();
</script>

<template>
  <section
    id="catering"
    class="relative overflow-hidden bg-green-800 py-24 sm:py-28"
  >
    <svg
      aria-hidden="true"
      viewBox="0 0 200 200"
      class="pointer-events-none absolute -top-16 -right-16 size-72 opacity-20"
    >
      <g fill="none" stroke="var(--color-cuivre-300)" stroke-width="0.75">
        <circle cx="100" cy="100" r="45" />
        <circle cx="100" cy="100" r="70" />
        <circle cx="100" cy="100" r="95" />
      </g>
    </svg>

    <div
      v-reveal
      class="relative mx-auto max-w-3xl px-6 text-center transition-all duration-1000 ease-out"
    >
      <p class="font-display text-xs tracking-[0.24em] text-cuivre-300">
        {{ t("home.catering.eyebrow") }}
      </p>
      <h2
        class="mt-3 font-display text-[clamp(1.85rem,4.5vw,2.75rem)] font-light text-white"
      >
        {{ t("home.catering.title") }}
      </h2>
      <p class="mx-auto mt-6 max-w-lg leading-relaxed text-green-100">
        {{ t("home.catering.body") }}
      </p>

      <UButton
        :href="`tel:${phone}`"
        color="primary"
        variant="solid"
        size="lg"
        class="mt-9 rounded-none font-display tracking-[0.14em] uppercase"
      >
        {{ t("home.catering.cta") }}
      </UButton>
    </div>
  </section>
</template>

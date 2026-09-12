<script setup lang="ts">
const { t } = useI18n();
const { city } = useVenue();
</script>

<template>
  <section
    class="relative isolate flex min-h-svh w-full items-center overflow-hidden"
  >
    <UContainer
      class="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-8"
    >
      <div class="relative z-10">
        <h1
          class="font-display text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.05] text-white"
        >
          {{ t("home.hero.headline") }}
        </h1>

        <p
          class="mt-6 max-w-md whitespace-pre-line text-balance text-ardoise-200"
        >
          {{ t("home.hero.body", { city }) }}
        </p>

        <UButton
          :to="{ hash: '#menu' }"
          color="primary"
          variant="solid"
          size="lg"
          class="mt-9 rounded-none font-display tracking-[0.14em] uppercase"
        >
          {{ t("home.hero.cta") }}
        </UButton>
      </div>

      <div
        class="relative sm:w-120 w-90 sm:h-150 h-100 aspect-3/4 mx-auto b-10"
      >
        <NuxtImg
          src="media/home/Restaurant.webp"
          :alt="t('home.hero.imageAlt')"
          class="absolute mask-[url(/mask.webp)] inset-0 rounded-[120px] h-full w-full object-cover mask-intersect"
        />
      </div>
    </UContainer>
    <div class="absolute text-center w-full sm:bottom-30 bottom-10">
      <div class="sm:text-[250px] text-[125px] leading-none tracking-tight">
        <span
          class="sm:text-transparent [-webkit-text-stroke:1.5px_var(--color-stone-700)]"
          >KA</span
        ><span class="ml-[-0.04em] translate-y-[0.14em] inline-block font-bold"
          >IDO</span
        >
      </div>
    </div>
  </section>
</template>

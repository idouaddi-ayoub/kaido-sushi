<script setup lang="ts">
const { menuUrl } = useVenue();
const { t } = useI18n();

const dishes = computed(() => [
  {
    name: "Push-Pop Sushi",
    note: t("home.menu.dishes.pushPopSushi.note"),
    img: "/media/menu/push-pop-sushi.webp",
    alt: t("home.menu.dishes.pushPopSushi.alt"),
  },
  {
    name: "Tasty Crousty Rolls",
    note: t("home.menu.dishes.tastyCroustyRolls.note"),
    img: "/media/menu/tasty-crousty-rolls.webp",
    alt: t("home.menu.dishes.tastyCroustyRolls.alt"),
  },
  {
    name: "Box à Deux",
    note: t("home.menu.dishes.boxADeux.note"),
    img: "/media/menu/box-à-deux.webp",
    alt: t("home.menu.dishes.boxADeux.alt"),
  },
  {
    name: "Bo Bun Poulet",
    note: t("home.menu.dishes.boBunPoulet.note"),
    img: "/media/menu/bo-bun-poulet.webp",
    alt: t("home.menu.dishes.boBunPoulet.alt"),
  },
]);
</script>

<template>
  <section id="menu" class="bg-white py-24 sm:py-32">
    <div
      v-reveal
      class="mx-auto max-w-7xl px-6 transition-all duration-1000 ease-out sm:px-12"
    >
      <div
        class="flex items-end justify-between gap-6 border-b border-black/10 pb-8"
      >
        <div>
          <p class="font-display text-2xl tracking-[0.24em] text-cuivre-600">
            {{ t("home.menu.eyebrow") }}
          </p>
          <h2
            class="mt-3 font-display text-[clamp(2rem,5vw,3.25rem)] font-light leading-none text-black"
          >
            {{ t("home.menu.title") }}
          </h2>
        </div>

        <UButton
          :to="menuUrl"
          target="_blank"
          color="neutral"
          variant="ghost"
          class="shrink-0 rounded-none font-display text-[0.7rem] tracking-[0.16em] text-black uppercase hover:text-cuivre-600"
        >
          {{ t("home.menu.full") }}
        </UButton>
      </div>

      <ul role="list" class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(d, i) in dishes" :key="d.img" class="group">
          <div class="aspect-4/5 overflow-hidden bg-neutral-100 rounded-4xl">
            <NuxtPicture
              :src="d.img"
              :alt="d.alt"
              :width="800"
              :height="1000"
              format="avif,webp"
              quality="72"
              :loading="i === 0 ? 'eager' : 'lazy'"
              :preload="i === 0"
              sizes="100vw sm:50vw lg:400px"
              :img-attrs="{
                class:
                  'size-full object-cover transition-transform duration-700 motion-safe:group-hover:scale-105',
              }"
            />
          </div>

          <h3
            class="mt-5 font-display text-sm tracking-[0.12em] text-black uppercase"
          >
            {{ d.name }}
          </h3>
          <p class="mt-2 text-sm leading-relaxed text-neutral-600">
            {{ d.note }}
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t, tm } = useI18n();
const { menuUrl } = useVenue();

const dishes = [
  {
    name: "Tasty Crousty Rolls",
    note: "Saumon, avocat, tempura",
    img: "/media/menu/tasty-crousty-rolls.webp",
    alt: "Six rouleaux de saumon panés tempura sur une ardoise noire",
  },
  {
    name: "Box à Deux",
    note: "Assortiment 24 pièces",
    img: "/media/menu/box-à-deux.webp",
    alt: "Boîte de vingt-quatre pièces de sushis variées",
  },
  {
    name: "Bo Bun Poulet",
    note: "Vermicelles, poulet grillé, crudités",
    img: "/media/menu/bo-bun-poulet.webp",
    alt: "Bol de bo bun au poulet grillé avec vermicelles et crudités",
  },
  {
    name: "Bo Bun Poulet",
    note: "Vermicelles, poulet grillé, crudités",
    img: "/media/menu/bo-bun-poulet.webp",
    alt: "Bol de bo bun au poulet grillé avec vermicelles et crudités",
  },
];
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

      <ul class="mt-14 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
        <li v-for="(d, i) in dishes" :key="d.img" class="group">
          <div class="aspect-4/5 overflow-hidden bg-neutral-100 rounded-4xl">
            <NuxtImg
              :src="d.img"
              :alt="d.alt"
              :width="800"
              :height="1000"
              format="avif"
              quality="72"
              :loading="i < 3 ? 'eager' : 'lazy'"
              sizes="100vw sm:50vw lg:400px"
              class="size-full object-cover transition-transform duration-700 group-hover:scale-105"
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

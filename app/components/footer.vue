<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { t } = useI18n();
const { phone, phoneDisplay, menuUrl, mapQuery } = useVenue();

const scrollTo = useSmoothScroll();

const items = computed<NavigationMenuItem[]>(() =>
  (["menu", "place", "catering", "infos"] as const).map((id) => ({
    label: t(`home.nav.${id}`),
    onSelect: (e: Event) => {
      e.preventDefault();
      scrollTo(id);
    },
  })),
);
</script>

<template>
  <UFooter
    :ui="{
      root: 'grain bg-ardoise-950 border-t border-cuivre-500/20',
      container: 'max-w-7xl',
    }"
  >
    <template #top>
      <div class="grid gap-10 py-14 m-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div class="flex items-center gap-3">
            <svg
              viewBox="0 0 100 100"
              class="size-8 shrink-0"
              fill="none"
              aria-hidden="true"
            >
              <circle
                cx="50"
                cy="50"
                r="47"
                stroke="var(--color-cuivre-500)"
                stroke-width="2"
              />
              <circle cx="50" cy="50" r="16" fill="var(--color-saumon-500)" />
            </svg>
            <span class="font-display text-lg tracking-[0.18em] text-white"
              >KAIDO</span
            >
          </div>
          <p class="mt-4 text-sm leading-relaxed text-ardoise-400">
            {{ t("home.hero.tagline") }}
          </p>
        </div>

        <div>
          <h3
            class="font-display text-[0.68rem] tracking-[0.2em] text-cuivre-400 uppercase"
          >
            {{ t("home.infos.hoursLabel") }}
          </h3>
          <p
            class="mt-4 whitespace-pre-line text-sm leading-relaxed text-ardoise-300"
          >
            {{ t("home.infos.hours") }}
          </p>
        </div>

        <div>
          <h3
            class="font-display text-[0.68rem] tracking-[0.2em] text-cuivre-400 uppercase"
          >
            {{ t("home.infos.addressLabel") }}
          </h3>
          <p class="mt-4 text-sm leading-relaxed text-ardoise-300">
            {{ t("home.infos.address") }}
          </p>
          <a
            :href="`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapQuery)}`"
            target="_blank"
            rel="noopener"
            class="mt-2 inline-block text-sm text-cuivre-300 underline-offset-4 hover:underline"
          >
            {{ t("home.infos.directions") }}
          </a>
        </div>

        <div>
          <h3
            class="font-display text-[0.68rem] tracking-[0.2em] text-cuivre-400 uppercase"
          >
            {{ t("home.footer.contact") }}
          </h3>
          <a
            :href="`tel:${phone}`"
            class="mt-4 flex items-center gap-2 text-sm text-ardoise-300 hover:text-cuivre-300"
          >
            <UIcon name="i-lucide-phone" class="size-4 shrink-0" />
            {{ phoneDisplay }}
          </a>
          <a
            href="https://www.instagram.com/kaido.sushibar/"
            target="_blank"
            rel="noopener"
            class="mt-3 flex items-center gap-2 text-sm text-ardoise-300 hover:text-cuivre-300"
          >
            <UIcon name="i-simple-icons-instagram" class="size-4 shrink-0" />
            @kaido.sushibar
          </a>
          <a
            :to="menuUrl"
            :href="menuUrl"
            target="_blank"
            rel="noopener"
            class="mt-3 flex items-center gap-2 text-sm text-ardoise-300 hover:text-cuivre-300"
          >
            <UIcon name="i-lucide-utensils" class="size-4 shrink-0" />
            {{ t("home.menu.full") }}
          </a>
        </div>
      </div>
    </template>

    <template #left>
      <p class="text-xs text-ardoise-500">
        © {{ new Date().getFullYear() }} Kaido Sushi Bar
      </p>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      :ui="{
        link: 'font-display text-[0.68rem] tracking-[0.14em] uppercase text-ardoise-400 hover:text-cuivre-300 after:hidden',
      }"
    />
  </UFooter>
</template>

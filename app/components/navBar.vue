<script setup lang="ts">
const { t, locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const { isOpen: venueOpen, label } = useOpeningHours();

const PHONE = "0650993767";

const sections = [
  { id: "carte", key: "home.nav.carte" },
  { id: "lieu", key: "home.nav.lieu" },
  { id: "traiteur", key: "home.nav.traiteur" },
  { id: "infos", key: "home.nav.infos" },
];

const menuOpen = ref(false);
const { y } = useWindowScroll();

const scrolled = computed(() => y.value > 80);

const otherLocales = computed(() =>
  locales.value.filter(
    (l) => (typeof l === "string" ? l : l.code) !== locale.value,
  ),
);

watch(menuOpen, (v) => {
  if (import.meta.client) document.body.style.overflow = v ? "hidden" : "";
});

const go = (id: string) => {
  menuOpen.value = false;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
    :class="scrolled ? 'bg-black/85 backdrop-blur-md' : 'bg-transparent'"
  >
    <div
      class="absolute inset-x-0 bottom-0 h-px bg-cuivre-500/25 transition-opacity duration-500"
      :class="scrolled ? 'opacity-100' : 'opacity-0'"
    />

    <nav
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8"
    >
      <button
        class="font-display text-lg text-white transition-opacity duration-500"
        :class="scrolled ? 'opacity-100' : 'pointer-events-none opacity-0'"
        @click="go('hero')"
      >
        KAIDO
      </button>

      <!-- Desktop -->
      <ul class="hidden items-center gap-9 md:flex">
        <li v-for="s in sections" :key="s.id">
          <button
            class="font-display text-xs text-ardoise-200 transition-colors hover:text-cuivre-300"
            @click="go(s.id)"
          >
            {{ t(s.key) }}
          </button>
        </li>
      </ul>

      <div class="flex items-center gap-4">
        <div
          class="flex items-center gap-2 border border-cuivre-500/30 px-3 py-1.5"
        >
          <span
            class="size-1.5 shrink-0 rounded-full"
            :class="venueOpen ? 'bg-saumon-500' : 'bg-ardoise-500'"
          />
          <span
            class="text-[0.68rem] font-light tracking-wide text-ardoise-200"
          >
            <span class="hidden sm:inline">{{
              t(label.key, label.params)
            }}</span>
            <span class="sm:hidden">{{
              t(venueOpen ? "home.hours.shortOpen" : "home.hours.shortClosed")
            }}</span>
          </span>
        </div>

        <NuxtLink
          v-for="l in otherLocales"
          :key="typeof l === 'string' ? l : l.code"
          :to="switchLocalePath(typeof l === 'string' ? l : l.code)"
          class="font-display text-[0.68rem] text-ardoise-300 transition-colors hover:text-cuivre-300"
        >
          {{ (typeof l === "string" ? l : l.code).toUpperCase() }}
        </NuxtLink>

        <button
          class="md:hidden"
          :aria-expanded="menuOpen"
          :aria-label="t('nav.menu')"
          @click="menuOpen = !menuOpen"
        >
          <UIcon
            :name="menuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            class="size-5 text-white"
          />
        </button>
      </div>
    </nav>

    <Transition
      enter-active-class="transition duration-400 ease-out"
      enter-from-class="opacity-0"
      leave-active-class="transition duration-300 ease-in"
      leave-to-class="opacity-0"
    >
      <div
        v-if="menuOpen"
        class="grain fixed inset-0 top-16 bg-ardoise-950 md:hidden"
      >
        <ul class="flex flex-col px-8 pt-10">
          <li v-for="(s, i) in sections" :key="s.id">
            <button
              class="w-full border-b border-cuivre-500/15 py-5 text-left font-display text-2xl text-white"
              :style="{ transitionDelay: `${i * 60}ms` }"
              @click="go(s.id)"
            >
              {{ t(s.key) }}
            </button>
          </li>
        </ul>

        <a
          :href="`tel:${PHONE}`"
          class="mt-10 flex items-center justify-center gap-2 px-8 text-sm text-cuivre-300"
        >
          <UIcon name="i-lucide-phone" class="size-4" />
          06 50 99 37 67
        </a>
      </div>
    </Transition>
  </header>
</template>

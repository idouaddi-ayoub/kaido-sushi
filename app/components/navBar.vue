<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const { t, locale } = useI18n();
const localePath = useLocalePath();
const route = useRoute();
const { isOpen: venueOpen, label } = useOpeningHours();
const { phoneDisplay } = useVenue();
const scrollTo = useSmoothScroll();

const open = ref(false);
const { y } = useWindowScroll();
const scrolled = computed(() => y.value > 80);

const go = (id?: string) => {
  open.value = false;
  scrollTo(id);
};

const onLogoClick = (e: MouseEvent, navigate: (e?: MouseEvent) => unknown) => {
  if (route.path !== localePath("/") || e.metaKey || e.ctrlKey || e.shiftKey) {
    return navigate(e);
  }
  e.preventDefault();
  go();
};

const items = computed<NavigationMenuItem[]>(() =>
  (["menu", "place", "catering", "infos"] as const).map((id) => ({
    label: t(`home.nav.${id}`),
    onSelect: (e: Event) => {
      e.preventDefault();
      go(id);
    },
  })),
);
</script>

<template>
  <UHeader
    v-model:open="open"
    mode="drawer"
    :ui="{
      root: 'fixed w-full top-0 z-50 border-0 transition-colors duration-500',
      container: 'max-w-7xl h-16',
    }"
    :class="scrolled ? 'bg-black/85 backdrop-blur-md' : 'bg-transparent'"
  >
    <div
      class="absolute inset-x-0 bottom-0 h-px bg-cuivre-500/25 transition-opacity duration-500"
      :class="scrolled ? 'opacity-100' : 'opacity-0'"
    />

    <template #left>
      <NuxtLink v-slot="{ href, navigate }" :to="localePath('/')" custom>
        <a
          :href="href ?? undefined"
          :aria-label="t('home.nav.home')"
          class="shrink-0"
          @click="onLogoClick($event, navigate)"
        >
          <NuxtImg src="/kaido_logo_white_.png" alt="" sizes="75px" />
        </a>
      </NuxtLink>
    </template>

    <UNavigationMenu
      :items="items"
      variant="link"
      :ui="{
        link: 'font-display text-xs tracking-[0.16em] uppercase text-ardoise-200 hover:text-cuivre-300 after:hidden cursor-pointer',
      }"
    />

    <template #right>
      <div class="flex items-center gap-4">
        <div
          v-if="label"
          class="hidden items-center gap-2 border border-cuivre-500/30 px-3 py-1.5 md:flex rounded-3xl"
        >
          <span
            class="size-1.5 shrink-0 rounded-full"
            :class="venueOpen ? 'bg-saumon-500' : 'bg-ardoise-500'"
          />
          <span
            class="text-[0.68rem] font-light tracking-wide text-ardoise-200"
          >
            {{ t(label.key, label.params) }}
          </span>
        </div>

        <LangSwitch class="cursor-pointer rounded-3xl" />
      </div>
    </template>

    <template #body>
      <div class="grain flex h-full flex-col bg-ardoise-950 px-2 pt-4">
        <div v-if="label" class="mb-8 flex items-center gap-2 px-4">
          <span
            class="size-1.5 shrink-0 rounded-full"
            :class="venueOpen ? 'bg-saumon-500' : 'bg-ardoise-500'"
          />
          <span class="text-[0.7rem] tracking-wide text-ardoise-300">
            {{ t(label.key, label.params) }}
          </span>
        </div>

        <UNavigationMenu
          :items="items"
          orientation="vertical"
          variant="link"
          :ui="{
            link: 'py-5 border-b border-cuivre-500/15 font-display text-2xl text-white',
          }"
        />

        <a
          :href="`tel:${useVenue().phone}`"
          class="py-5 flex items-center justify-center gap-2 text-sm text-cuivre-300"
        >
          <UIcon name="i-lucide-phone" class="size-4" />
          {{ phoneDisplay }}
        </a>
      </div>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const { t, locale, locales } = useI18n();
const switchLocalePath = useSwitchLocalePath();

const flags: Record<string, string> = {
  en: "i-circle-flags-gb",
  fr: "i-circle-flags-fr",
};

const items = computed(() =>
  locales.value.map((l) => {
    const code = typeof l === "string" ? l : l.code;
    return { label: code.toUpperCase(), value: code, icon: flags[code] };
  }),
);

const selected = computed({
  get: () => locale.value,
  set: (code: string) => navigateTo(switchLocalePath(code as any)),
});
</script>

<template>
  <USelectMenu
    v-model="selected"
    :items="items"
    value-key="value"
    :search-input="false"
    :aria-label="t('home.nav.language')"
    variant="ghost"
    class="w-24"
    :ui="{
      base: 'font-display text-[0.68rem] tracking-[0.12em] text-ardoise-300 rounded-none',
      content: 'rounded-none ring-cuivre-500/20 bg-ardoise-950 cursor-pointer',
    }"
  >
    <template #leading>
      <UIcon v-if="flags[selected]" :name="flags[selected]" class="size-4" />
    </template>
  </USelectMenu>
</template>

<script setup lang="ts">
const { t } = useI18n();
const scrollTo = useSmoothScroll();

const { y } = useWindowScroll();
const { height: winH } = useWindowSize();
const docH = ref(0);

onMounted(() => {
  docH.value = document.documentElement.scrollHeight;
  useResizeObserver(document.body, () => {
    docH.value = document.documentElement.scrollHeight;
  });
});

const progress = computed(() => {
  const max = docH.value - winH.value;
  return max > 0 ? Math.min(y.value / max, 1) : 0;
});

const past = computed(() => y.value > 120);
</script>

<template>
  <UButton
    class="fixed right-6 bottom-6 z-40 hidden size-14 place-items-center transition-opacity duration-500 sm:grid cursor-pointer rounded-full"
    :class="past ? 'opacity-100' : 'pointer-events-none opacity-0'"
    :aria-label="t('home.backToTop')"
    @click="scrollTo()"
  >
    <svg viewBox="0 0 100 100" class="absolute size-full -rotate-90">
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="var(--color-cuivre-500)"
        stroke-opacity="0.2"
        stroke-width="1.5"
      />
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="none"
        stroke="var(--color-cuivre-400)"
        stroke-width="1.5"
        pathLength="1"
        stroke-dasharray="1"
        :stroke-dashoffset="1 - progress"
        class="transition-[stroke-dashoffset] duration-150 ease-out"
      />
    </svg>
    <UIcon name="i-lucide-arrow-up" class="relative size-4 text-cuivre-300" />
  </UButton>
</template>

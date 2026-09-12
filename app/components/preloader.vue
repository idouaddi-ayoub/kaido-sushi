<script setup lang="ts">
const MIN_MS = 900;
const MAX_MS = 3500;

const active = ref(true);
const leaving = ref(false);

useHead({
  bodyAttrs: {
    class: computed(() => (active.value ? "overflow-hidden" : "")),
  },
  script: [
    {
      innerHTML: `try{if(sessionStorage.getItem('kaido:seen')==='1'||location.hash)document.documentElement.classList.add('kaido-skip')}catch(e){}`,
      tagPosition: "head",
    },
  ],
});

const dismiss = (instant = false) => {
  if (instant) {
    active.value = false;
    return;
  }
  leaving.value = true;
  setTimeout(() => (active.value = false), 900);
};

onMounted(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const deepLink = window.location.hash !== "";

  if (reduced || deepLink) {
    dismiss(true);
    return;
  }

  const started = performance.now();

  const poster = new Image();
  poster.src = "/test.webp";

  Promise.race([
    poster.decode().catch(() => undefined),
    new Promise((r) => window.addEventListener("load", r, { once: true })),
    new Promise((r) => setTimeout(r, MAX_MS)),
  ]).then(() => {
    setTimeout(
      () => dismiss(),
      Math.max(0, MIN_MS - (performance.now() - started)),
    );
  });
});
</script>

<template>
  <div
    v-if="active"
    class="kaido-preloader fixed inset-0 z-100 grid place-items-center bg-black transition-[clip-path] duration-900 ease-[cubic-bezier(0.76,0,0.24,1)]"
    :class="
      leaving
        ? 'pointer-events-none [clip-path:inset(0_0_100%_0)]'
        : '[clip-path:inset(0_0_0_0)]'
    "
    aria-hidden="true"
  >
    <div class="relative grid place-items-center">
      <svg viewBox="0 0 200 200" class="size-[min(52vw,15rem)]" fill="none">
        <circle
          cx="100"
          cy="100"
          r="97"
          stroke="var(--color-cuivre-500)"
          stroke-width="0.5"
          pathLength="1"
          stroke-dasharray="1"
          stroke-dashoffset="1"
          class="animate-[kaido-draw_1.6s_cubic-bezier(0.65,0,0.35,1)_forwards]"
          transform="rotate(-90 100 100)"
        />
      </svg>

      <span
        class="absolute font-display text-[clamp(1.1rem,4vw,1.6rem)] text-white opacity-0 animate-[kaido-in_1s_ease-out_0.5s_forwards]"
      >
        KAIDO
      </span>

      <span
        class="absolute -bottom-10 h-px w-10 origin-left scale-x-0 bg-saumon-500 animate-[kaido-rule_0.8s_ease-out_1.1s_forwards]"
      />
    </div>
  </div>
</template>

<style>
.kaido-skip .kaido-preloader {
  display: none;
}

@keyframes kaido-draw {
  from {
    stroke-dashoffset: 1;
  }
  to {
    stroke-dashoffset: 0;
  }
}
@keyframes kaido-in {
  from {
    opacity: 0;
    transform: translateY(0.5rem);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
@keyframes kaido-rule {
  to {
    transform: scaleX(1);
  }
}
</style>

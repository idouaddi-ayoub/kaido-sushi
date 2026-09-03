<script setup lang="ts">
const { t } = useI18n();

const root = ref<HTMLElement | null>(null);
const ring = ref<SVGCircleElement | null>(null);

onMounted(async () => {
  if (!import.meta.client) return;

  const gsap = (await import("gsap")).default;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.set("[data-hero-fade]", { opacity: 1, y: 0 });
    gsap.set(ring.value, { strokeDashoffset: 0, opacity: 1 });
    return;
  }

  const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

  tl.to(ring.value, { opacity: 1, duration: 0.3 })
    .to(
      ring.value,
      { strokeDashoffset: 0, duration: 2.2, ease: "power2.inOut" },
      "<",
    )
    .to(
      "[data-hero-media]",
      { opacity: 1, scale: 1, duration: 2.4, ease: "power2.out" },
      "-=1.6",
    )
    .to(
      "[data-hero-fade]",
      { opacity: 1, y: 0, duration: 1, stagger: 0.25 },
      "-=1.4",
    );
});
</script>

<template>
  <section
    ref="root"
    class="relative isolate flex h-svh w-full items-center justify-center overflow-hidden bg-black"
  >
    <div data-hero-media class="absolute inset-0 scale-105 opacity-0">
      <div
        class="size-full bg-ardoise-950 bg-[radial-gradient(ellipse_60%_45%_at_72%_24%,rgba(240,200,122,0.14),transparent_70%),radial-gradient(ellipse_50%_40%_at_12%_92%,rgba(120,150,170,0.05),transparent_70%)]"
      />
    </div>

    <div
      class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_5%,rgba(0,0,0,0.55)_55%,#000_100%)]"
    />
    <div class="grain absolute inset-0" />

    <svg
      class="pointer-events-none absolute size-[min(78vw,34rem)]"
      viewBox="0 0 200 200"
      fill="none"
      aria-hidden="true"
    >
      <circle
        ref="ring"
        cx="100"
        cy="100"
        r="97"
        pathLength="1"
        stroke="var(--color-cuivre-500)"
        stroke-width="0.4"
        stroke-dasharray="1"
        stroke-dashoffset="1"
        class="opacity-0"
        transform="rotate(-90 100 100)"
      />
    </svg>

    <div class="relative flex flex-col items-center px-6 text-center">
      <h1
        data-hero-fade
        class="translate-y-4 font-display text-[clamp(2.5rem,11vw,6rem)] leading-none text-white opacity-0"
      >
        KAIDO
      </h1>

      <p
        data-hero-fade
        class="mt-5 max-w-md translate-y-4 text-balance text-sm font-light tracking-wider text-ardoise-200 opacity-0 sm:text-base"
      >
        {{ t("home.hero.tagline") }}
      </p>

      <span
        data-hero-fade
        class="mt-3 h-px w-16 translate-y-4 bg-saumon-500 opacity-0"
      />
    </div>

    <div data-hero-fade class="absolute bottom-8 translate-y-4 opacity-0">
      <UIcon
        name="i-lucide-chevron-down"
        class="size-5 animate-bounce text-cuivre-300/60"
        aria-hidden="true"
      />
      <span class="sr-only">{{ t("hero.scroll") }}</span>
    </div>
  </section>
</template>

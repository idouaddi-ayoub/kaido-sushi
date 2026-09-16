<script setup lang="ts">
import gsap from "gsap";

const { t } = useI18n();
const { city } = useVenue();

const main = ref<HTMLElement | null>(null);
let ctx: gsap.Context | undefined;

onMounted(() => {
  ctx = gsap.context(() => {
    const btn = main.value!.querySelector<HTMLElement>(".hero-cta")!;
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    gsap.set(".hero-cta-shine", { skewX: -20, xPercent: -150 });
    const idle = gsap
      .timeline({ paused: true, repeat: -1, repeatDelay: 2.5 })
      .to(".hero-cta-shine", {
        xPercent: 350,
        duration: 1.1,
        ease: "power2.inOut",
      });
    const startIdle = () => {
      if (!reduced) idle.play();
    };

    const wave = gsap.to(".kaido-big", {
      paused: true,
      yPercent: -12,
      duration: 1.0,
      ease: "sine.inOut",
      stagger: { each: 0.18, repeat: -1, yoyo: true },
    });

    gsap
      .timeline({ delay: 0.2, defaults: { ease: "expo.out" } })
      .from(".title", {
        y: 40,
        autoAlpha: 0,
        filter: "blur(8px)",
        duration: 1.2,
        ease: "power3.out",
        stagger: 0.3,
      })
      .to(
        ".hero-frame",
        { clipPath: "inset(0% 0% 0% 0% round 120px)", duration: 1.6 },
        0.2,
      )
      .from(".hero-img", { scale: 1.3, duration: 1.6 }, "<")
      .to(btn, { clipPath: "inset(0% 0% 0% 0%)", duration: 1 }, 0.7)
      .from(".hero-cta-text", { yPercent: 120, duration: 0.8 }, "<0.25")
      .call(startIdle, [], ">")
      .from(
        ".kaido-big",
        {
          rotateX: -90,
          yPercent: 50,
          scale: 0.8,
          autoAlpha: 0,
          filter: "blur(12px)",
          transformOrigin: "50% 100%",
          duration: 1.4,
          ease: "back.out(1.6)",
          stagger: { each: 0.1, from: "center" },
        },
        0.5,
      )
      .call(
        () => {
          if (!reduced) wave.play();
        },
        [],
        ">",
      );

    const hover = gsap
      .timeline({
        paused: true,
        defaults: { duration: 0.45, ease: "power3.inOut" },
      })
      .to([".hero-cta-label", ".hero-cta-clone"], { yPercent: -100 })
      .to(btn, { scale: 1.03 }, 0);

    const onEnter = () => {
      idle.pause(0);
      hover.play();
    };
    const onLeave = () => {
      hover.reverse();
      startIdle();
    };

    if (window.matchMedia("(hover: hover)").matches) {
      btn.addEventListener("pointerenter", onEnter);
      btn.addEventListener("pointerleave", onLeave);
    }

    return () => {
      btn.removeEventListener("pointerenter", onEnter);
      btn.removeEventListener("pointerleave", onLeave);
    };
  }, main.value!);
});

onUnmounted(() => ctx?.revert());
</script>

<template>
  <section
    ref="main"
    class="relative isolate flex min-h-svh w-full items-center overflow-hidden pt-20 sm:pt-0"
  >
    <UContainer
      class="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-8"
    >
      <div class="relative z-10">
        <h1
          class="title invisible font-display text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.05] text-white"
        >
          {{ t("home.hero.headline") }}
        </h1>

        <p
          class="title invisible mt-6 hidden max-w-md whitespace-pre-line text-balance text-ardoise-200 sm:block"
        >
          {{ t("home.hero.body", { city }) }}
        </p>

        <UButton
          :to="{ hash: '#menu' }"
          color="primary"
          variant="solid"
          size="lg"
          class="hero-cta relative mt-9 overflow-hidden rounded-none font-display tracking-[0.14em] uppercase"
          style="clip-path: inset(0% 100% 0% 0%)"
        >
          <span
            class="hero-cta-shine pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/40 to-transparent"
            aria-hidden="true"
          />
          <span class="relative block overflow-hidden">
            <span class="hero-cta-text relative block">
              <span class="hero-cta-label block">{{ t("home.hero.cta") }}</span>
              <span
                class="hero-cta-clone absolute left-0 top-full w-full"
                aria-hidden="true"
              >
                {{ t("home.hero.cta") }}
              </span>
            </span>
          </span>
        </UButton>
      </div>

      <div
        class="hero-frame relative mx-auto aspect-3/4 h-100 w-90 overflow-hidden sm:h-150 sm:w-120"
        style="clip-path: inset(100% 0% 0% 0% round 120px)"
      >
        <NuxtImg
          src="media/home/Restaurant.webp"
          :alt="t('home.hero.imageAlt')"
          loading="eager"
          preload
          class="hero-img absolute inset-0 h-full w-full rounded-[120px] object-cover mask-[url(/mask.webp)] mask-intersect"
        />
      </div>
    </UContainer>

    <div class="absolute bottom-10 w-full text-center sm:bottom-30">
      <div
        class="text-[100px] leading-none tracking-tight perspective-[1000px] sm:text-[250px]"
      >
        <span
          class="[-webkit-text-stroke:1.5px_var(--color-stone-700)] sm:text-transparent"
        >
          <span
            v-for="(l, i) in 'KA'"
            :key="`ka-${i}`"
            class="kaido-big invisible inline-block"
            >{{ l }}</span
          > </span
        ><span class="ml-[-0.04em] inline-block translate-y-[0.14em] font-bold">
          <span
            v-for="(l, i) in 'IDO'"
            :key="`ido-${i}`"
            class="kaido-big invisible inline-block"
            >{{ l }}</span
          >
        </span>
      </div>
    </div>
  </section>
</template>

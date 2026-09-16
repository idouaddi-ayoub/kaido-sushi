<script setup lang="ts">
import gsap from "gsap";

const { finish } = usePreloader();

const MAX_MS = 3500;
const letters = "KAIDO".split("");

const root = ref<HTMLElement | null>(null);
const active = ref(true);

let ctx: gsap.Context | undefined;
let timer: ReturnType<typeof setTimeout> | undefined;
let tick: gsap.TickerCallback | undefined;
let dismissed = false;

const play = (tl: gsap.core.Timeline) => {
  if (tick) gsap.ticker.remove(tick);

  const next: gsap.TickerCallback = (_t, dt) => {
    const time = Math.min(tl.totalTime() + dt / 1000, tl.totalDuration());
    tl.totalTime(time);
    if (time >= tl.totalDuration()) gsap.ticker.remove(next);
  };

  tick = next;
  gsap.ticker.add(next);
  return tl;
};

const dismiss = (instant = false) => {
  if (dismissed) return;
  dismissed = true;

  if (instant) {
    active.value = false;
    finish();
    return;
  }

  ctx?.add(() => {
    play(
      gsap
        .timeline({
          paused: true,
          defaults: { duration: 0.6, ease: "power3.in" },
          onComplete: () => (active.value = false),
        })
        .set(root.value, { pointerEvents: "none" })
        .to(".kaido-letter", { yPercent: -110, stagger: 0.04 })
        .to(".kaido-svg", { scale: 0.8, autoAlpha: 0 }, 0)
        .to(".kaido-rule", { scaleX: 0, transformOrigin: "right" }, 0)
        .to(
          root.value,
          { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" },
          0.35,
        )
        .call(finish, [], 0.7),
    );
  });
};

const pageLoaded = () =>
  document.readyState === "complete"
    ? Promise.resolve()
    : new Promise((r) => window.addEventListener("load", r, { once: true }));

onMounted(() => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const skip = document.documentElement.classList.contains("kaido-skip");

  if (reduced || skip) return dismiss(true);

  let intro!: gsap.core.Timeline;
  ctx = gsap.context(() => {
    intro = play(
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(".kaido-circle", {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
        })
        .from(
          ".kaido-svg",
          { rotate: -60, scale: 0.9, duration: 1.4, ease: "power2.inOut" },
          0,
        )
        .set(".kaido-word", { autoAlpha: 1 }, 0.5)
        .from(
          ".kaido-letter",
          { yPercent: 110, duration: 0.8, stagger: 0.06 },
          0.5,
        )
        .to(".kaido-rule", { scaleX: 1, duration: 0.6 }, "-=0.4"),
    );
  }, root.value!);

  gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });

  const poster = new Image();
  poster.src = "/test.webp";

  const loaded = Promise.race([
    poster.decode().catch(() => undefined),
    pageLoaded(),
    new Promise((r) => (timer = setTimeout(r, MAX_MS))),
  ]);

  Promise.all([intro.then(), loaded]).then(() => dismiss());
});

onUnmounted(() => {
  clearTimeout(timer);
  if (tick) gsap.ticker.remove(tick);
  ctx?.revert();
});
</script>

<template>
  <div
    v-if="active"
    ref="root"
    class="kaido-preloader fixed inset-0 z-100 grid place-items-center bg-black"
    style="clip-path: inset(0% 0% 0% 0%)"
    aria-hidden="true"
  >
    <div class="relative grid place-items-center">
      <svg
        viewBox="0 0 200 200"
        class="kaido-svg size-[min(52vw,15rem)]"
        fill="none"
      >
        <circle
          class="kaido-circle"
          cx="100"
          cy="100"
          r="97"
          stroke="var(--color-cuivre-500)"
          stroke-width="0.5"
          pathLength="1"
          stroke-dasharray="1"
          stroke-dashoffset="1"
          transform="rotate(-90 100 100)"
        />
      </svg>

      <span
        class="kaido-word invisible absolute flex overflow-hidden pl-[0.3em] font-display text-[clamp(1.1rem,4vw,1.6rem)] tracking-[0.3em] text-white"
      >
        <span
          v-for="(letter, i) in letters"
          :key="i"
          class="kaido-letter inline-block"
        >
          {{ letter }}
        </span>
      </span>

      <span
        class="kaido-rule absolute -bottom-10 h-px w-10 origin-left scale-x-0 bg-saumon-500"
      />
    </div>
  </div>
</template>

<style>
.kaido-skip .kaido-preloader {
  display: none;
}
</style>

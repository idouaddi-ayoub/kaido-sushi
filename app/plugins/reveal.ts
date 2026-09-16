export default defineNuxtPlugin((nuxtApp) => {
  const observers = new WeakMap<HTMLElement, IntersectionObserver>();
  useHead({
    script: [
      {
        innerHTML: `document.documentElement.classList.add('js')`,
        tagPosition: "head",
      },
    ],
  });

  nuxtApp.vueApp.directive<HTMLElement>("reveal", {
    getSSRProps: () => ({ "data-reveal": "" }),
    beforeMount(el) {
      el.dataset.reveal = "";
    },

    mounted(el) {
      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          el.dataset.revealed = "";
          io.disconnect();
        },
        { threshold: 0.15 },
      );

      io.observe(el);
    },

    unmounted(el) {
      observers.get(el)?.disconnect();
      observers.delete(el);
    },
  });
});

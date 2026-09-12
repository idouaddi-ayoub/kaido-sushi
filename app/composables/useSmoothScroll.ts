// Scrolls to a section id, or to the top when no id is given.
// Goes through Lenis when it's running so it doesn't fight the native scroll;
// Lenis is null under prefers-reduced-motion, where the native scroll is used.
export function useSmoothScroll() {
  const { $lenis } = useNuxtApp();

  return (id?: string) => {
    const target = id ? document.getElementById(id) : 0;
    if (target === null) return;

    if ($lenis) $lenis.scrollTo(target);
    else if (target === 0) window.scrollTo({ top: 0 });
    else target.scrollIntoView();
  };
}

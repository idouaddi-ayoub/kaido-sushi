import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// Waits for the preloader to finish, then starts the next animation trigger
export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger);

  const { isDone } = usePreloader();

  if (!isDone.value) {
    gsap.globalTimeline.pause();

    const stop = watch(isDone, (done) => {
      if (!done) return;
      stop();
      gsap.globalTimeline.resume();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
  }
});

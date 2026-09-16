<script setup lang="ts">
import ScrollRing from "~/components/scrollRing.vue";
import Catering from "../components/home/catering.vue";
import Hero from "../components/home/hero.vue";
import Infos from "../components/home/infos.vue";
import Menu from "../components/home/menu.vue";
import Place from "../components/home/place.vue";

defineOgImage("KAIDO.takumi", {
  title: "Hello OG Image",
});
</script>

<template>
  <div class="bg-black">
    <Hero id="hero" />
    <Menu />
    <Place />
    <Catering />
    <Infos />
    <ScrollRing />
  </div>
</template>

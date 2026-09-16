<script setup lang="ts">
import Footer from "~/components/footer.vue";
import NavBar from "~/components/navBar.vue";
import Preloader from "~/components/preloader.vue";
</script>
<template>
  <div>
    <Preloader />
    <NavBar />
    <slot />
    <Footer />
  </div>
</template>

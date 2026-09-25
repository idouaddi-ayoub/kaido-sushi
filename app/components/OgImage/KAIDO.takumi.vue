<script setup lang="ts">
const { title, description, footer } = defineProps<{
  title: string;
  description: string;
  footer: string;
}>();
</script>

<template>
  <div
    <div
      class="w-full h-full flex items-center px-20 font-[Jost] bg-[#121110]
             bg-[radial-gradient(circle_at_18%_30%,rgba(184,115,51,0.18),transparent_45%),radial-gradient(circle_at_85%_90%,rgba(255,111,79,0.12),transparent_40%),linear-gradient(135deg,#1b1a18_0%,#0e0d0c_100%)]"
    >
  >
    <div
      class="flex items-center justify-center shrink-0 w-85 h-85 rounded-full"
      style="
        border: 3px solid #b87333;
        box-shadow: 0 0 60px rgba(184, 115, 51, 0.25);
      "
    >
<NuxtImg src="KAIDO_SUSHI.webp" height="330" class="rounded-full"/>
    </div>

    <!-- Text -->
    <div class="flex flex-col justify-center pl-20 flex-1">
      <div class="flex flex-col">
        <span
          class="text-[96px] leading-none text-[#f5f1ea]"
          style="font-weight: 300; letter-spacing: 0.35em"
          >KAIDO</span
        >
        <span
          class="text-[28px] mt-3 text-[#b87333]"
          style="font-weight: 500; letter-spacing: 0.6em"
          >SUSHI BAR</span
        >
      </div>

      <div class="w-20 h-0.75 my-10" style="background: #ff6f4f" />

      <span
        class="text-[44px] leading-tight text-[#f5f1ea]"
        style="font-weight: 500"
      >
        {{ title }}
      </span>
      <span
        class="text-[26px] mt-4 leading-snug text-[#f5f1ea]/70"
        style="font-weight: 300"
      >
        {{ description }}
      </span>

      <span
        class="text-[20px] mt-10 text-[#b87333]"
        style="font-weight: 500; letter-spacing: 0.15em"
        >{{ footer }}</span
      >
    </div>
  </div>
</template>

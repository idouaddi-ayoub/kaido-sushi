<script setup lang="ts">
const props = defineProps<{
  src: string;
  mapsUrl: string;
  title?: string;
}>();

const consent = useCookie<boolean>("maps-consent", {
  maxAge: 60 * 60 * 24 * 180,
  sameSite: "lax",
  default: () => false,
});

const mounted = ref(false);
onMounted(() => {
  mounted.value = true;
});

const showMap = computed(() => mounted.value && consent.value);

const { locale } = useI18n();
const copy = computed(() =>
  locale.value.startsWith("fr")
    ? {
        notice:
          "Cette carte est fournie par Google Maps. En l'affichant, vous acceptez que Google dépose des cookies et collecte des données de navigation.",
        load: "Afficher la carte",
        open: "Ouvrir dans Google Maps",
        hide: "Masquer la carte",
      }
    : {
        notice:
          "This map is provided by Google Maps. By showing it, you agree that Google may set cookies and collect browsing data.",
        load: "Show map",
        open: "Open in Google Maps",
        hide: "Hide map",
      },
);
</script>

<template>
  <div class="w-full">
    <div
      class="relative aspect-video w-full overflow-hidden rounded-lg bg-elevated"
    >
      <iframe
        v-if="showMap"
        :src="props.src"
        :title="props.title ?? 'Google Maps'"
        class="absolute inset-0 size-full border-0"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      />

      <div
        v-else
        class="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6 text-center"
      >
        <UIcon name="i-lucide-map-pin" class="size-8 text-muted" />
        <p class="max-w-sm text-sm text-muted">
          {{ copy.notice }}
        </p>
        <div class="flex flex-wrap justify-center gap-2">
          <UButton
            :label="copy.load"
            @click="consent = true"
            class="cursor-pointer"
            variant="subtle"
          />
          <UButton
            :label="copy.open"
            :to="props.mapsUrl"
            target="_blank"
            color="neutral"
            variant="outline"
            trailing-icon="i-lucide-external-link"
          />
        </div>
      </div>
    </div>

    <UButton
      v-if="showMap"
      type="button"
      class="mt-2 text-xs text-muted underline underline-offset-2 hover:text-default cursor-pointer m-2"
      @click="consent = false"
    >
      {{ copy.hide }}
    </UButton>
  </div>
</template>

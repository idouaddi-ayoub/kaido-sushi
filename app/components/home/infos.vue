<script setup lang="ts">
const { t } = useI18n();
const { isOpen: venueOpen, label } = useOpeningHours();
const { phone, phoneDisplay, mapQuery } = useVenue();
</script>

<template>
  <section id="infos" class="grain bg-black py-24 sm:py-32">
    <div
      v-reveal
      class="mx-auto max-w-7xl px-6 transition-all duration-1000 ease-out sm:px-12"
    >
      <div class="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div>
          <p class="font-display text-xs tracking-[0.24em] text-cuivre-400">
            {{ t("home.infos.eyebrow") }}
          </p>
          <h2
            class="mt-3 font-display text-[clamp(1.85rem,4.5vw,2.75rem)] font-light text-white"
          >
            {{ t("home.infos.title") }}
          </h2>

          <div v-if="label" class="mt-9 flex items-center gap-3">
            <span
              class="size-2 shrink-0 rounded-full"
              :class="venueOpen ? 'bg-saumon-500' : 'bg-ardoise-600'"
            />
            <span class="font-display text-sm tracking-widest text-white">
              {{ t(label.key, label.params) }}
            </span>
          </div>

          <dl class="mt-10 space-y-6 text-sm">
            <div class="border-t border-cuivre-500/20 pt-5">
              <dt
                class="font-display text-[0.68rem] tracking-[0.2em] text-cuivre-400 uppercase"
              >
                {{ t("home.infos.hoursLabel") }}
              </dt>
              <dd
                class="mt-2 whitespace-pre-line leading-relaxed text-ardoise-200"
              >
                {{ t("home.infos.hours") }}
              </dd>
            </div>

            <div class="border-t border-cuivre-500/20 pt-5">
              <dt
                class="font-display text-[0.68rem] tracking-[0.2em] text-cuivre-400 uppercase"
              >
                {{ t("home.infos.addressLabel") }}
              </dt>
              <dd class="mt-2 leading-relaxed text-ardoise-200">
                {{ t("home.infos.address") }}
              </dd>
            </div>

            <div class="border-t border-cuivre-500/20 pt-5">
              <dt
                class="font-display text-[0.68rem] tracking-[0.2em] text-cuivre-400 uppercase"
              >
                {{ t("home.infos.phoneLabel") }}
              </dt>
              <dd class="mt-2">
                <a
                  :href="`tel:${phone}`"
                  class="text-ardoise-200 underline-offset-4 hover:text-cuivre-300 hover:underline"
                >
                  {{ phoneDisplay }}
                </a>
              </dd>
            </div>
          </dl>
        </div>

        <div
          class="min-h-88 overflow-hidden ring-1 ring-cuivre-500/20 lg:min-h-full"
        >
          <iframe
            :title="t('home.infos.mapTitle')"
            class="size-full grayscale-[0.6] invert-[0.92] contrast-[1.1]"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
            :src="`https://www.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`"
          />
        </div>
      </div>
    </div>
  </section>
</template>

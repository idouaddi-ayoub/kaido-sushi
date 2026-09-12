const TZ = "Europe/Paris";

const SERVICES: [number, number][] = [
  [12 * 60, 14 * 60],
  [19 * 60, 22 * 60],
];

const CLOSED_DAYS = [0];

function venueNow(now: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: TZ,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "0";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return {
    day: days.indexOf(get("weekday")),
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

function fmt(m: number, loc: string) {
  const h = Math.floor(m / 60);
  const min = m % 60;

  if (loc.startsWith("fr")) {
    return `${String(h).padStart(2, "0")}h${min ? String(min).padStart(2, "0") : ""}`;
  }

  return `${h % 12 || 12}${min ? `:${String(min).padStart(2, "0")}` : ""}${h < 12 ? "am" : "pm"}`;
}

export function useOpeningHours() {
  const { locale } = useI18n();
  // Stays null until mounted: the page is prerendered, so the server's clock
  // says nothing about when it's viewed and would mismatch on hydration.
  const now = ref<Date | null>(null);
  let timer: ReturnType<typeof setInterval>;

  onMounted(() => {
    now.value = new Date();
    timer = setInterval(() => (now.value = new Date()), 60_000);
  });
  onUnmounted(() => clearInterval(timer));

  const state = computed(() => {
    if (!now.value) return null;

    const { day, minutes } = venueNow(now.value);
    const f = (m: number) => fmt(m, locale.value);

    if (CLOSED_DAYS.includes(day)) {
      return {
        open: false,
        key: "home.hours.closedToday" as const,
        params: {},
      };
    }

    for (const [start, end] of SERVICES) {
      if (minutes >= start && minutes < end) {
        return {
          open: true,
          key: "home.hours.openUntil" as const,
          params: { time: f(end) },
        };
      }
    }

    const next = SERVICES.find(([start]) => minutes < start);
    if (next) {
      return {
        open: false,
        key: "home.hours.opensAt" as const,
        params: { time: f(next[0]) },
      };
    }

    const tomorrowClosed = CLOSED_DAYS.includes((day + 1) % 7);
    return tomorrowClosed
      ? { open: false, key: "home.hours.closedNow" as const, params: {} }
      : {
          open: false,
          key: "home.hours.opensTomorrow" as const,
          params: { time: f(SERVICES[0]![0]) },
        };
  });

  return {
    isOpen: computed(() => state.value?.open ?? false),
    label: computed(() => state.value),
  };
}

import en from "./locales/en";
import fr from "./locales/fr";

export default defineI18nConfig(() => ({
  legacy: false,
  locales: ["fr", "en"],
  locale: "fr",
  messages: {
    fr,
    en,
  },
}));

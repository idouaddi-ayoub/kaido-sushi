// app/app.config.ts

export default defineAppConfig({
  ui: {
    colors: {
      primary: "saumon",
      secondary: "cuivre",
      neutral: "ardoise",
      success: "green",
      info: "cuivre",
      warning: "amber",
      error: "red",
    },

    button: {
      defaultVariants: {
        color: "neutral",
        variant: "ghost",
        size: "lg",
      },
      slots: {
        base: "font-display uppercase tracking-[0.18em] font-light rounded-none",
      },
    },

    link: {
      base: "underline-offset-4 decoration-cuivre-500/40 hover:decoration-cuivre-300",
    },

    card: {
      slots: {
        root: "rounded-none ring-cuivre-500/20 bg-transparent",
        header: "font-display tracking-[0.14em]",
      },
    },

    modal: {
      slots: {
        content: "rounded-none ring-cuivre-500/20",
      },
    },

    separator: {
      slots: {
        border: "border-cuivre-500/25",
      },
    },
  },
});

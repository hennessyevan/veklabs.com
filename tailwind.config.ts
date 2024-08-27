import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        background: colors.neutral[900],
        foreground: colors.neutral[100],
      }),
      width: {
        container: "calc(100vw - clamp(1.5rem, 2.5vw, 3rem))",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 0px 4px var(--tw-shadow-color)",
        lg: "0 0px 16px var(--tw-shadow-color)",
      },
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      )
    }),
    plugin(({ addVariant }: any) => {
      addVariant("starting", "@starting-style")
    }),
    plugin(({ addUtilities }) => {
      addUtilities([
        {
          "allow-discrete": "transition-behavior: allow-discrete;",
        },
      ])
    }),
  ],
} satisfies Config

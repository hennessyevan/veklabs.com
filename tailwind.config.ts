import type { Config } from "tailwindcss"

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
    },
  },
} as Config

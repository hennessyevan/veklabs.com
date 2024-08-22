import defaultConfig from "tailwindcss/defaultConfig"
import type { Config } from "tailwindcss"
import type { PluginAPI } from "tailwindcss/types/config"

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        background: colors.neutral[900],
        foreground: colors.neutral[100],
      }),
      borderWidth: {
        0.5: "0.5px",
      },
    },
  },
} as Config

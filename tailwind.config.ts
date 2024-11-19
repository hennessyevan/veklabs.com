import type { Config } from "tailwindcss"
import plugin from "tailwindcss/plugin"
import scrollDrivenAnimations from "@adam.plesnik/tailwindcss-scroll-driven-animations"
import spring from "tailwindcss-spring"

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: ({ colors }) => ({
        background: colors.neutral[900],
        foreground: colors.neutral[100],
        accent: colors.blue,
      }),
      width: {
        container: "calc(100vw - clamp(1.5rem, 2.5vw, 3rem))",
      },
      borderWidth: {
        0.5: "0.5px",
      },
      fontSize: {
        xxs: "0.6rem",
      },
      textShadow: {
        sm: "0 1px 2px var(--tw-shadow-color)",
        DEFAULT: "0 0px 4px var(--tw-shadow-color)",
        lg: "0 0px 16px var(--tw-shadow-color)",
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        parallax: "parallax",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(1rem)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        parallax: {
          "0%": { transform: "translateY(var(--parallax-start, 0))" },
          "100%": { transform: "translateY(var(--parallax-end, 50%))" },
        },
      },
    },
  },
  plugins: [
    spring,
    scrollDrivenAnimations,
    plugin(({ addVariant }) => {
      addVariant("starting", "@starting-style")
    }),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          "text-shadow": (value) => ({
            textShadow: value,
          }),
        },
        { values: theme("textShadow") },
      )
      matchUtilities(
        {
          "parallax-start": (value) => ({
            "--parallax-start": value,
          }),
        },
        { values: theme("translate"), supportsNegativeValues: true },
      )
      matchUtilities(
        {
          "parallax-end": (value) => ({
            "--parallax-end": value,
          }),
        },
        { values: theme("translate"), supportsNegativeValues: true },
      )
    }),
    plugin(({ addUtilities }) => {
      addUtilities({
        ".timeline-root": { "animation-timeline": "scroll(root);" },
        ".parallax": { "animation-name": "parallax;" },
        ".allow-discrete": { "transition-behavior": "allow-discrete;" },
      })
    }),
  ],
} satisfies Config

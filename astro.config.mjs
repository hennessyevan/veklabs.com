import { defineConfig } from "astro/config"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import readingTime from "astro-reading-time"

import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  prefetch: true,
  redirects: {
    "/reports": "/reports/page/1",
    "/reports/page": "/reports/page/1",
  },
  site: "https://veklabs.com",
  integrations: [readingTime(), mdx(), sitemap(), tailwind(), react()],
})

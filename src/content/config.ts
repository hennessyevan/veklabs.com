import { defineCollection, z } from "astro:content"

const report = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
})

const video = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    videoID: z.string(),
    videoURL: z.string(),
    previewURL: z.string(),
    image: z.string(),
    type: z.string(),
  }),
})

export const collections = { report, video }

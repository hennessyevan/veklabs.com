import { defineCollection, reference, z } from "astro:content"

const report = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      category: z.string().optional(),
      author: z.string(),
      keywords: z.array(z.string()).optional(),
      // Transform string to Date object
      date: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      image: image().optional(),
    }),
})

const service = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      page_title: z.string(),
      image: image().optional(),
      order: z.number(),
      speed: z.number(),
      summary: z.string(),
    }),
})

const offering = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      image: image(),
      description: z.string(),
      rel: reference("service"),
    }),
})

const team = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      name: z.string(),
      image: image(),
      competencies: z.array(z.string()),
      title: z.string(),
      order: z.number().optional(),

      channel: z.array(
        z.object({
          name: z.string(),
          url: z.string().url(),
          icon: z.string(),
        }),
      ),
    }),
})

const video = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      videoID: z.string(),
      videoURL: z.string(),
      previewURL: z.string(),
      image: image(),
      type: z.string(),
    }),
})
export const collections = { report, video, service, offering, team }

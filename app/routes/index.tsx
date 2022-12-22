import type {
  LinksFunction,
  LoaderArgs,
  LoaderFunction,
  MetaFunction,
} from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData } from '@remix-run/react'
import groq from 'groq'
import AlbumCover from '~/components/VideoCover'

import Layout from '~/components/Layout'
import Title from '~/components/Title'
import { getClient } from '~/sanity/client'

import styles from '~/styles/app.css'
import { videoStubsZ } from '~/types/video'
import { useRouteData } from 'remix-utils'
import type { HomeDocument } from '~/types/home'

export const links: LinksFunction = () => {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = (data) => {
  const home = data.parentsData.root.home as HomeDocument

  return {
    title: [home.title, home.siteTitle].filter(Boolean).join(' | '),
  }
}

export const loader = async (props: LoaderArgs) => {
  const query = groq`*[_type == "video"][0...12]{
    _id,
    title,
    "slug": slug.current,
    "artist": artist->title,
    image
  }`

  const videos = await getClient()
    .fetch(query)
    .then((res) => (res ? videoStubsZ.parse(res) : null))

  if (!videos) {
    throw new Response('Not found', { status: 404 })
  }

  return json({ videos })
}

export default function Index() {
  const { videos } = useLoaderData<typeof loader>()
  const { home } = useRouteData(`root`) as { home: HomeDocument }

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-6 md:gap-12">
        {home.title ? <Title>{home.title}</Title> : null}
        {videos.length > 0 ? (
          <ul className="grid grid-cols-2 gap-6 md:grid-cols-3 md:gap-12 lg:grid-cols-4">
            {videos.map((video) => (
              <li key={video._id} className="group relative flex flex-col">
                <div className="relative overflow-hidden transition-all duration-200 ease-in-out group-hover:scale-105 group-hover:opacity-90">
                  <div className="absolute z-0 h-48 w-[200%] translate-x-20 translate-y-20 -rotate-45 bg-gradient-to-b from-white to-transparent opacity-25 mix-blend-overlay transition-transform duration-500 ease-in-out group-hover:translate-y-10 group-hover:translate-x-10 group-hover:opacity-75" />
                  <AlbumCover image={video.image} title={video.title} />
                </div>
                <div className="flex flex-col">
                  {video?.slug ? (
                    <Link
                      prefetch="intent"
                      to={video?.slug}
                      className="text-bold pt-4 text-xl font-bold tracking-tighter transition-colors duration-100 ease-in-out hover:bg-cyan-400 hover:text-white md:text-3xl"
                    >
                      {video.title}
                      {/* Makes this entire block clickable */}
                      <span className="absolute inset-0" />
                    </Link>
                  ) : (
                    <span className="pt-4 text-xl font-bold">
                      {video.title}
                    </span>
                  )}
                  {video?.artist ? (
                    <span className="bg-black font-bold leading-none tracking-tighter text-white">
                      {video.artist}
                    </span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No videos found</p>
        )}
      </div>
    </Layout>
  )
}

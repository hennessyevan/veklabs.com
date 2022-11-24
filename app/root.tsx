import type { LinksFunction, MetaFunction } from '@remix-run/cloudflare'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Links,
  LiveReload,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
  useOutlet,
} from '@remix-run/react'

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Vek Labs',
  viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [{ rel: 'icon', href: '/logo.svg' }]

export default function App() {
  const outlet = useOutlet()

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <header>
          <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
          </nav>
        </header>
        <AnimatePresence exitBeforeEnter initial={false}>
          <motion.main
            key={useLocation().pathname}
            initial={{ x: '10%', opacity: 0 }}
            animate={{ x: '0', opacity: 1 }}
            exit={{ x: '-40%', opacity: 0 }}
          >
            {outlet}
          </motion.main>
        </AnimatePresence>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

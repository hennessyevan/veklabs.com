import type { LinksFunction, MetaFunction } from "@remix-run/cloudflare"
import {
	Links,
	LiveReload,
	Meta,
	Scripts,
	ScrollRestoration,
	useLocation,
	useOutlet,
} from "@remix-run/react"
import { AnimatePresence, motion } from "framer-motion"
import { Header } from "./components/Header"

import globalCSS from "styles/global.css"

export const meta: MetaFunction = () => ({
	charset: "utf-8",
	title: "Vek Labs",
	viewport: "width=device-width,initial-scale=1",
})

export const links: LinksFunction = () => [
	{ rel: "icon", href: "/logo.svg" },
	{ rel: "mask-icon", href: "/logo.svg", color: "white" },
	{ rel: "stylesheet", href: globalCSS },
]

export default function App() {
	const outlet = useOutlet()

	return (
		<html lang="en">
			<head>
				<Meta />
				<Links />
			</head>
			<body>
				<Header />

				<AnimatePresence mode="wait" initial={false}>
					<motion.main
						className="site-main"
						key={useLocation().pathname}
						initial={{ opacity: 0, x: "-10%" }}
						animate={{ opacity: 1, x: 0 }}
						exit={{ opacity: 0, x: "10%" }}
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

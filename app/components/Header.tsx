import { NavLink } from "@remix-run/react"
import { base, headerMenu } from "~/config"

export function Header() {
	return (
		<header className="site-header" role="banner">
			<div className="wrapper">
				<div className="large menu">
					<a className="anchor left" href={base} title="Go Home">
						<svg className="header-logo">
							<use href="/logo.svg#logo" />
						</svg>
					</a>

					<nav className="center">
						{headerMenu.map((item) => (
							<NavLink key={item.to} to={item.to} className="top">
								{item.label}
							</NavLink>
						))}
					</nav>

					<div className="right">
						<div className="top menu-link">Contact</div>
					</div>
				</div>
			</div>
		</header>
	)
}

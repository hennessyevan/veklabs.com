import { Menu } from "lucide-react"
import { baseURL, menu, title } from "../config.json"
import { HeaderProvider } from "../context/headerContext"
import logoFullSVG from "../images/logo-full.svg?url"
import HeaderLink from "./HeaderLink"

export interface HeaderProps {
  currentPath: string
}

export default function Header({ currentPath }: HeaderProps) {
  return (
    <HeaderProvider currentPath={currentPath}>
      <header
        className="sticky top-0 z-20 border-b-0.5 border-white/10 bg-background/65 py-3 backdrop-blur-xl backdrop-saturate-150 md:py-4"
        role="banner"
      >
        <div className="mx-auto w-container">
          <div className="relative hidden h-8 items-center justify-between md:flex">
            <a href={baseURL}>
              <img
                className="w-full max-w-24 justify-self-start md:max-w-28"
                src={logoFullSVG}
                alt={title}
              />
            </a>
            <div className="absolute left-1/2 flex -translate-x-1/2 flex-nowrap gap-4 overflow-auto">
              {currentPath !== "/" && <HeaderLink href="/">Home</HeaderLink>}
              {menu.main.map((menuItem) => (
                <HeaderLink key={menuItem.url} href={menuItem.url}>
                  {menuItem.name}
                </HeaderLink>
              ))}
            </div>
            <HeaderLink href="/contact">Contact</HeaderLink>
          </div>

          <div className="relative flex h-8 items-center justify-between md:hidden">
            <a href={baseURL}>
              <img
                className="w-full max-w-24 justify-self-start"
                src={logoFullSVG}
                alt={title}
              />
            </a>
            <div
              id="mobilemenu"
              className="fixed left-0 top-0 size-full bg-background/30 p-4 backdrop-blur-lg duration-200 starting:bg-background/0 starting:backdrop-blur-0"
            >
              <button className="absolute right-3 top-4 text-foreground">
                <Menu size="24" />
              </button>

              <div className="flex flex-col gap-4 pt-8">
                {currentPath !== "/" && <HeaderLink href="/">Home</HeaderLink>}
                {menu.main.map((menuItem) => (
                  <HeaderLink key={menuItem.url} href={menuItem.url}>
                    {menuItem.name}
                  </HeaderLink>
                ))}
                <HeaderLink href="/contact">Contact</HeaderLink>
              </div>
            </div>

            <button>
              <Menu size="24" />
            </button>
          </div>
        </div>
      </header>
    </HeaderProvider>
  )
}

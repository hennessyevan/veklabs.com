import { baseURL } from "../config.json"

type HeaderLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string
  currentPath: string
}

const removeTrailingSlash = (str: string) =>
  str.endsWith("/") ? str.slice(0, -1) : str

export default function HeaderLink({
  href,
  className,
  currentPath,
  ...props
}: HeaderLinkProps) {
  const currentUrl = URL.canParse(currentPath, baseURL)
    ? new URL(currentPath, baseURL)
    : new URL(baseURL)
  const headerUrl = new URL(href, baseURL)

  const isActive =
    removeTrailingSlash(headerUrl.pathname) &&
    removeTrailingSlash(currentUrl.pathname).includes(
      removeTrailingSlash(headerUrl.pathname),
    )

  return (
    <a
      href={href}
      className={`rounded-lg px-3 py-2 text-sm font-medium uppercase duration-300 ${className} ${
        isActive
          ? "bg-white text-black hover:text-black"
          : "text-white hover:bg-white/15 hover:text-white"
      }`}
      {...props}
    >
      {props.children}
    </a>
  )
}

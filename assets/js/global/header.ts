import { ResizeObserver } from "@juggle/resize-observer"
import { spring, styler } from "popmotion"

const links = document.querySelectorAll(".menu-link")
const drawerEl = document.querySelector(".drawer")
const drawer = styler(drawerEl)
const menuItems = document.querySelector(".small.submenu").childElementCount

let menuHeight: number = 0
const windowObserver = new ResizeObserver(([body]) => {
 if (body.contentRect.width <= 780) {
  menuHeight = menuItems * 85 + 50

  if (drawer.get("height") < menuHeight - 50 && drawer.get("height") > 10) {
   spring({
    from: drawer.get("height"),
    stiffness: 75,
    to: menuHeight,
   }).start((v: string) => drawer.set("height", v))
  }
 } else {
  menuHeight = 125

  if (drawer.get("height") > menuHeight + 50) {
   spring({
    from: drawer.get("height"),
    stiffness: 75,
    to: menuHeight,
   }).start((v: string) => drawer.set("height", v))
  }
 }
})

windowObserver.observe(document.querySelector("body"))

for (const link of links) {
 link.addEventListener("click", async (e) => {
  e.preventDefault()

  if (link.getAttribute("data-active") === "true") {
   link.setAttribute("data-active", "false")

   spring({ from: menuHeight, to: 0 }).start((v: string) =>
    drawer.set("height", v)
   )
  } else {
   link.setAttribute("data-active", "true")
   spring({
    from: 0,
    stiffness: 75,
    to: menuHeight,
   }).start((v: string) => drawer.set("height", v))
  }
 })
}

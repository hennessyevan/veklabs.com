import { getHeight } from "get-height"
import { spring, styler } from "popmotion"

const link = document.getElementById("contact-link")
const drawerEl = document.getElementById("contact-drawer")
const innerDrawer = document.getElementById("inner-drawer")
const drawer = styler(drawerEl)

link.addEventListener("click", async e => {
 e.preventDefault()

 if (link.hasAttribute("class") && link.getAttribute("class") === "active") {
  link.removeAttribute("class")
  const height = await getHeight(innerDrawer)
  spring({
   to: { opacity: 0, height: 0 },
   from: { height, opacity: 1 }
  }).start(v => drawer.set(v))
 } else {
  link.setAttribute("class", "active")
  const height = await getHeight(innerDrawer)
  spring({
   from: { opacity: 0, height: 0 },
   to: { height: height + 24, opacity: 1 }
  }).start(v => drawer.set(v))
 }
})

import { spring, styler } from "popmotion"

const link = document.getElementById("contact-link")
const drawerEl = document.getElementById("contact-drawer")
const drawer = styler(drawerEl)

link.addEventListener("click", async e => {
 e.preventDefault()

 if (link.getAttribute("data-active") === "true") {
  link.setAttribute("data-active", "false")

  spring({
   to: { opacity: 0, height: 0 },
   from: { height: 80, opacity: 1 }
  }).start(v => drawer.set(v))
 } else {
  link.setAttribute("data-active", "true")

  spring({
   from: { opacity: 0, height: 0 },
   to: { height: 80, opacity: 1 }
  }).start(v => drawer.set(v))
 }
})

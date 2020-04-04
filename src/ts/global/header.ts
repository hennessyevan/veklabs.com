import { spring, styler } from "popmotion"

const links = document.querySelectorAll(".menu-link")
const drawerEl = document.querySelector(".drawer")
const drawer = styler(drawerEl)

for (const link of links) {
 link.addEventListener("click", async e => {
  e.preventDefault()

  if (link.getAttribute("data-active") === "true") {
   link.setAttribute("data-active", "false")
   link.classList.remove("active")

   spring({
    to: { opacity: 0, height: 0 },
    from: { height: 80, opacity: 1 }
   }).start(v => drawer.set(v))
  } else {
   link.setAttribute("data-active", "true")
   link.classList.add("active")

   spring({
    from: { opacity: 0, height: 0 },
    to: { height: 80, opacity: 1 }
   }).start(v => drawer.set(v))
  }
 })
}

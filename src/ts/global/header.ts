const links = document.querySelectorAll(".menu-link")
const drawerEl = document.querySelector(".drawer")

for (const link of links) {
 link.addEventListener("click", async (e) => {
  e.preventDefault()

  if (link.getAttribute("data-active") === "true") {
   link.setAttribute("data-active", "false")
   drawerEl.classList.remove("active")
   link.classList.remove("active")
  } else {
   link.setAttribute("data-active", "true")
   drawerEl.classList.add("active")
   link.classList.add("active")
  }
 })
}

import { listen, spring, styler, tween } from "popmotion"

const members = document.querySelectorAll(".team-member")

members.forEach(member => {
 const memberID = member.getAttribute("data-member-id")
 const infoOverlay = document.querySelector(`[data-overlay-id="${memberID}"]`)
 const info = infoOverlay.querySelector(".member-info")
 const overlay = styler(infoOverlay)
 const inner = styler(info)

 listen(member, "click").start(e => {
  listen(infoOverlay, "click").start(e => {
   if (e.target !== infoOverlay) {
    return
   }

   document.body.style.overflow = ""

   tween({ from: 1, to: 0 }).start(v => overlay.set("opacity", v))
   spring({
    from: "0%",
    to: "10%",
    stiffness: 80
   }).start(v => inner.set("y", v))
   setTimeout(() => {
    overlay.set("display", "none")
   }, 300)
  })

  overlay.set("display", "flex")

  tween({ from: 0, to: 1 }).start(v => overlay.set("opacity", v))
  spring({
   from: "50%",
   to: "0%",
   stiffness: 80
  }).start(v => inner.set("y", v))

  document.body.style.overflow = "hidden"
  member.setAttribute("data-active", "true")
 })
})

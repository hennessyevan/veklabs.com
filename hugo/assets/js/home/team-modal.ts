import { listen, spring, styler, tween } from "popmotion"

const members = document.querySelectorAll(".team-member")

members.forEach(member => {
 const memberID = member.getAttribute("data-member-id")
 const infoOverlay = document.querySelector(`[data-overlay-id="${memberID}"]`)
 const info = infoOverlay.querySelector(".member-info")
 const overlay = styler(infoOverlay)
 const inner = styler(info)
 let active = false

 document.body.appendChild(infoOverlay)

 listen(member, "click").start(e => {
  function closeModal(start = 0) {
   if (active !== true) {
    return
   }
   active = false
   document.body.style.overflow = ""

   tween({ from: 1, to: 0 }).start(v => overlay.set("opacity", v))
   spring({
    from: start,
    to: 100,
    stiffness: 80
   }).start(v => inner.set("y", v))
   setTimeout(() => {
    overlay.set("display", "none")
   }, 300)
  }

  listen(infoOverlay, "click").start(e => {
   if (e.target !== infoOverlay) {
    return
   }

   closeModal()
  })

  overlay.set("display", "flex")
  active = true
  tween({ from: 0, to: 1 }).start(v => overlay.set("opacity", v))
  spring({
   from: "50%",
   to: "0%",
   stiffness: 80
  }).start(v => inner.set("y", v))

  document.body.style.overflow = "hidden"
  member.setAttribute("data-active", "true")

  // Swipe to Dismiss
  let startY = 0
  let endY = 0

  function startTracking(e: TouchEvent) {
   startY = e.changedTouches[0].screenY
  }

  function stopTracking(e: TouchEvent) {
   endY = e.changedTouches[0].screenY

   if (endY - startY >= 200) {
    closeModal(endY)
   }
  }

  listen(infoOverlay, "touchstart").start(startTracking)
  listen(document, "touchend").start(stopTracking)
 })
})

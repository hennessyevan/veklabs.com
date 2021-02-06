import { styler, tween } from "popmotion"

const headerAnchors = document.querySelectorAll(".anchor")

headerAnchors.forEach(anchor => {
 anchor.addEventListener("click", e => {
  e.preventDefault()

  const targetEl = anchor.getAttribute("href")
  const targetTop = document.querySelector(targetEl).getBoundingClientRect().top

  tween({ from: window.pageYOffset, to: targetTop }).start(v =>
   styler(window).set("scrollTop", v)
  )
 })
})

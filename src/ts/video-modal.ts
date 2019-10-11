import Player from "@vimeo/player"
import { listen, styler, tween } from "popmotion"
import "./contact"

const videos = document.querySelectorAll(".video")
const overlayEl = document.getElementById("overlay")
const overlay = styler(overlayEl)

// modals
let player
videos.forEach(video => {
 const videoID = video.getAttribute("data-videoID")
 if (!videoID) return

 // let preview
 // listen(video, "mouseover").start(async e => {
 // window.requestAnimationFrame(async () => {
 //  let count = 0
 //  const previewEl = video.querySelector(".preview")
 //  const previewStyler = styler(previewEl)
 //  const { height } = video.getBoundingClientRect()

 //  preview = new Player(previewEl, {
 //   id: videoID,
 //   background: true,
 //   height: height + 50,
 //   autopause: true,
 //   quality: "240p"
 //  })

 //  await preview.play()
 //  await preview.setCurrentTime(10)
 //  await preview.addCuePoint(20)

 //  preview.on("cuepoint", async () => {
 //   if (count <= 3) {
 //    await preview.setCurrentTime(10)
 //    count++
 //   }
 //  })

 //  preview.on("error", console.log)

 //  preview.on("loaded", () =>
 //   tween({
 //    from: { opacity: 0, transform: "scale(0.9)" },
 //    to: { opacity: 1, transform: "scale(1)" },
 //    duration: 1500
 //   }).start(v => previewStyler.set(v))
 //  )
 // })

 // listen(video, "mouseout").start(async e => {
 //  const previewEl = video.querySelector(".preview")
 //  const previewStyler = styler(previewEl)
 //  tween({
 //   from: { opacity: 1, transform: "scale(1)" },
 //   to: { opacity: 0, transform: "scale(0.85)" },
 //   duration: 225
 //  }).start(v => previewStyler.set(v)),
 //   await preview.destroy()
 // })

 listen(video, "click").start(e => {
  // Show overlay
  overlay.set("display", "initial")
  document.body.style.overflow = "hidden"
  tween({ to: { opacity: 1 }, duration: 500 }).start(v => overlay.set(v))

  setTimeout(() => {
   player = new Player("player", {
    id: videoID,
    autoplay: true,
    width: window.innerWidth * 0.88,
    playsinline: false,
    color: "#FFFFFF"
   })
  }, 650)
 })
})

function cleanUp() {
 player && player.destroy()

 tween({ to: { opacity: 0 }, duration: 500 }).start(v => overlay.set(v))
 document.body.style.overflow = ""
 setTimeout(() => {
  overlay.set("display", "none")
 }, 500)
}

document.addEventListener("keyup", e => {
 if (e.keyCode === 27) {
  cleanUp()
 }
})

// Configure close button
document.querySelector(".close").addEventListener("click", async e => {
 cleanUp()
})

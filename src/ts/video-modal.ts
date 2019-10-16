import { listen, styler, tween } from "popmotion"
import "./contact"

const videos = document.querySelectorAll(".video")
const overlayEl = document.getElementById("overlay")
const overlay = styler(overlayEl)

// modals
videos.forEach(video => {
 const videoSrc = video.getAttribute("data-url")
 const poster = video.getAttribute("data-poster")
 const preview: HTMLVideoElement = video.querySelector(".preview")
 const previewStyler = preview && styler(preview)
 if (!videoSrc) return

 preview.addEventListener("mouseover", function() {
  this.play()
  let hit = false
  this.addEventListener("timeupdate", e => {
   if (this.currentTime >= 15 && !hit) {
    hit = true
    tween({
     from: 1,
     to: 0,
     duration: 1500
    }).start(v => previewStyler.set("opacity", v))

    setTimeout(() => {
     this.currentTime = 0
     tween({
      from: 0,
      to: 1,
      duration: 500
     }).start(v => previewStyler.set("opacity", v))
     hit = false
    }, 1500)
   }
  })
 })

 preview.addEventListener("mouseout", function() {
  this.pause()
  this.currentTime = 0
  previewStyler.set("opacity", "")
 })

 listen(video, "click").start(e => {
  // Show overlay
  overlay.set("display", "flex")
  document.body.style.overflow = "hidden"
  tween({ to: { opacity: 1 }, duration: 500 }).start(v => overlay.set(v))

  const video = `
  <div class="video-wrapper">
   <video id="player" src="${videoSrc}" poster="${poster}" playsinline controls autoplay></video>
  </div>
 `

  overlayEl.innerHTML = video
 })
})

overlayEl.addEventListener("click", e => {
 cleanUp()
})

function cleanUp() {
 tween({ to: { opacity: 0 }, duration: 500 }).start(v => overlay.set(v))
 document.body.style.overflow = ""
 overlayEl.innerHTML = ""
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

import { listen, styler, tween } from "popmotion"

const videos = document.querySelectorAll(".video")
const overlayEl = document.getElementById("overlay")
const overlay = styler(overlayEl)

// modals
videos.forEach((video) => {
 const videoSrc = video.getAttribute("data-url")
 const poster = video.getAttribute("data-poster")
 const preview: HTMLVideoElement = video.querySelector(".preview")
 const previewStyler = preview && styler(preview)
 if (!videoSrc) return

 preview.addEventListener("mouseover", async function () {
  try {
   await this.play()
   let hit = false
   this.addEventListener("timeupdate", (e) => {
    if (this.currentTime >= 15 && !hit) {
     hit = true
     tween({
      from: 1,
      to: 0,
      duration: 1500,
     }).start((v: number) => previewStyler.set("opacity", v))

     setTimeout(() => {
      this.currentTime = 0
      tween({
       from: 0,
       to: 1,
       duration: 500,
      }).start((v: number) => previewStyler.set("opacity", v))
      hit = false
     }, 1500)
    }
   })
  } catch (error) {
   console.log(error)
  }
 })

 preview.addEventListener("mouseout", function () {
  this.pause()
  this.currentTime = 0
  previewStyler.set("opacity", "")
 })

 listen(video, "click").start(() => {
  // Show overlay
  overlay.set("display", "flex")
  document.body.style.overflow = "hidden"
  tween({ to: { opacity: 1 }, duration: 500 }).start((v: string) =>
   overlay.set(v)
  )

  const video = `
  <div class="video-wrapper">
  <div class="close">
  <span>
   Close
  </span>
  <svg viewBox="0 0 24 24" alt="Close Modal">
   <use href="/assets/close.svg#icon"></use>
  </svg>
 </div>
   <video id="player" src="${videoSrc}" poster="${poster}" controls autoplay type='video/mp4'></video>
  </div>
 `

  overlayEl.innerHTML = video

  document
   .querySelector("#player")
   .addEventListener("ended", cleanUp, { once: true })

  // Configure close button
  document.querySelector(".close").addEventListener("click", (e) => {
   cleanUp()
  })
 })
})

overlayEl.addEventListener("click", (e) => {
 if (e.target !== overlayEl) return
 cleanUp()
})

function cleanUp() {
 tween({ to: { opacity: 0 }, duration: 500 }).start((v: string) =>
  overlay.set(v)
 )
 document.body.style.overflow = ""
 overlayEl.innerHTML = ""
 setTimeout(() => {
  overlay.set("display", "none")
 }, 500)
}

document.addEventListener("keyup", (e) => {
 if (e.keyCode === 27) {
  cleanUp()
 }
})

import { tween } from "popmotion"

const volumeButton: HTMLElement = document.querySelector(".volume-icon")
const heroVideo: HTMLVideoElement = document.querySelector(
 "#hero-video-element"
)

volumeButton.addEventListener("click", () => {
 switch (volumeButton.dataset.state) {
  case "on":
   volumeButton.setAttribute("alt", "Turn volume on")
   volumeButton.setAttribute("src", "/assets/volume-control-off.svg")
   volumeButton.dataset.state = "off"

   tween({ from: 1, to: 0, duration: 500 }).start(v => {
    heroVideo.volume = v
    if (v <= 0) {
     heroVideo.muted = true
    }
   })

   break

  case "off":
  default:
   volumeButton.setAttribute("alt", "Turn volume off")
   volumeButton.setAttribute("src", "/assets/volume-control-on.svg")
   volumeButton.dataset.state = "on"

   tween({ from: 0, to: 1, duration: 1500 }).start(v => {
    heroVideo.volume = v
    if (v >= 0) {
     heroVideo.muted = false
    }
   })

   break
 }
})

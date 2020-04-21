import { tween } from "popmotion"

const volumeButton: HTMLElement = document.querySelector(".volume-icon")
const playButton: HTMLElement = document.querySelector(".play-icon")
const heroVideo: HTMLVideoElement = document.querySelector(
 "#hero-video-element"
)

volumeButton.addEventListener("click", function() {
 switch (heroVideo.muted) {
  case false:
   tween({ from: 1, to: 0, duration: 500 }).start(v => {
    heroVideo.volume = v
    if (v <= 0) {
     volumeButton.setAttribute("alt", "Turn volume on")
     volumeButton.setAttribute("src", "/assets/volume-control-off.svg")
     volumeButton.dataset.state = "off"
     heroVideo.muted = true
    }
   })

   break

  case true:
  default:
   tween({ from: 0, to: 1, duration: 1500 }).start(v => {
    heroVideo.volume = v
    if (v >= 0) {
     volumeButton.setAttribute("alt", "Turn volume off")
     volumeButton.setAttribute("src", "/assets/volume-control-on.svg")
     volumeButton.dataset.state = "on"
     heroVideo.muted = false
    }
   })

   break
 }
})

heroVideo.addEventListener("pause", () => {
 playButton.hidden = false
})

playButton.addEventListener("click", async () => {
 try {
  await heroVideo.play()
  playButton.hidden = true
 } catch (error) {}
})

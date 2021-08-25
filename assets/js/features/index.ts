const trailers = document.querySelectorAll<HTMLDivElement>(".trailer")

for (const trailer of trailers) {
 const video: HTMLVideoElement = trailer.querySelector("video")
 const controlElement: HTMLImageElement = trailer.querySelector(".play-icon")
 const fullscreenElement: HTMLImageElement =
  trailer.querySelector(".fullscreen-icon")

 fullscreenElement.addEventListener("click", (e) => {
  e.stopPropagation()

  if (video.requestFullscreen) {
   video.requestFullscreen()
  } else if (video.mozRequestFullScreen) {
   video.mozRequestFullScreen()
  } else if (video.webkitRequestFullscreen) {
   video.webkitRequestFullscreen()
  } else if (video.msRequestFullscreen) {
   video.msRequestFullscreen()
  }
 })

 video.addEventListener("ended", () => {
  video.load()
  trailer.setAttribute("playing", "false")
  trailer.setAttribute("played", "false")
 })

 trailer.addEventListener("click", () => {
  if (video.paused) {
   video.play()

   trailer.setAttribute("playing", "true")
   trailer.setAttribute("played", "true")

   controlElement.setAttribute("src", "/assets/controls-pause.svg")
  } else {
   video.pause()

   trailer.setAttribute("playing", "false")
   controlElement.setAttribute("src", "/assets/controls-play.svg")
  }
 })
}

import { scrollSnapToNext } from "scroll-snap-api"

const videoScroller: HTMLElement = document.querySelector(".video-grid-wrapper")
const left = document.querySelector("#videos .arrow-left")
const right = document.querySelector("#videos .arrow-right")

left.addEventListener("click", () => scrollSnapToNext(videoScroller, "left"))
right.addEventListener("click", () => scrollSnapToNext(videoScroller, "right"))

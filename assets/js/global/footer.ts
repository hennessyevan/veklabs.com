import { animate } from "motion"

const banner: HTMLElement = document.querySelector(".banner")
const delay = Number(banner.dataset.delay)

animate(banner, { opacity: 0, display: "none" }, { delay }).play()

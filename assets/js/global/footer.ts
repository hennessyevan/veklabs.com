import { confetti } from "dom-confetti"

const button: HTMLElement = document.querySelector(".banner")

document.addEventListener("DOMContentLoaded", () => {
 setTimeout(() => {
  confetti(button, {
   angle: 110,
   elementCount: 75,
   colors: ["#d37829", "#ffffff", "#394053"],
  })
 }, 2000)
})

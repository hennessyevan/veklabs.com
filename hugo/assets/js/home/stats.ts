import { tween, easing } from "popmotion"

const observer = new IntersectionObserver(
 entries => {
  const entry = entries[0]

  if (entry.isIntersecting) {
   const target = entry.target
   const numbers = target.querySelectorAll(".number")

   numbers.forEach((number, i) => {
    tween({
     from: 0,
     to: parseInt(number.getAttribute("data-targetNumber")),
     duration: 1500 + i * 250,
     ease: easing.easeOut
    })
     .pipe(Math.round)
     .start((v: number) => (number.innerHTML = v.toString()))
   })

   observer.unobserve(target)
  }
 },
 { threshold: 1 }
)

const stats = document.querySelector("#stats .grid")
observer.observe(stats)

stats.querySelectorAll(".number").forEach(number => {
 number.setAttribute("data-targetNumber", number.innerHTML.trim())
 number.innerHTML = "0"
})

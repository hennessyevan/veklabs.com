import { animate, stagger, spring, timeline } from "motion"

const videos = document.querySelectorAll<HTMLDivElement>(".video")

const observer = new IntersectionObserver((entries) => {
 const visibleTargets = entries
  .filter((entry) => entry.isIntersecting)
  .map((entry) => [
   entry.target,
   { y: [20, 0], opacity: [0, 1] },
   { at: "-0.1", duration: 0.3 },
  ])

 timeline(visibleTargets)

 //  visibleTargets.forEach(observer.unobserve)
})

for (const video of videos) {
 observer.observe(video)
}

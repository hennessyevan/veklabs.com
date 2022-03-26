import { animate } from "popmotion"

const videos = document.querySelectorAll<HTMLDivElement>(".video")

animate(videos, { opacity: 1, y: 0 }, { delay: stagger(0.1), duration: 1 })

// Check if elements are visible using the IntersectionObserver API
// https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
const observer = new IntersectionObserver((entries) => {
 entries.forEach((entry) => {
  if (entry.isIntersecting) {
   animate(entry.target, { opacity: [null, 1], y: [null, 0] }, { duration: 1 })
  } else {
   animate(entry.target, { opacity: 0, y: 20 }, { duration: 0 })
  }
 })
})

for (const video of videos) {
 observer.observe(video)
}

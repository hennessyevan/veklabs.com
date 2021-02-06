const lqipImages: NodeListOf<HTMLImageElement> = document.querySelectorAll(
 "[data-src]"
)

for (const image of lqipImages) {
 image.addEventListener("load", (e) => {
  image.setAttribute("src", image.dataset.src)
 })
}

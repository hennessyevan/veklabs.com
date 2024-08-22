const lightSchemeIcon = document.querySelector("link#light-scheme-icon")
const darkSchemeIcon = document.querySelector("link#dark-scheme-icon")

const mediaMatcher = window.matchMedia("(prefers-color-scheme: dark)")
mediaMatcher.addListener(onUpdate)
onUpdate()

function onUpdate() {
 if (mediaMatcher.matches) {
  lightSchemeIcon.remove()
  document.head.append(darkSchemeIcon)
 } else {
  document.head.append(lightSchemeIcon)
  darkSchemeIcon.remove()
 }
}

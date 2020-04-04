import Rellax from "rellax"

document.onreadystatechange = () => {
 if (
  document.readyState === "complete" &&
  window.matchMedia("(pointer: fine)").matches &&
  !!document.querySelector(".rellax")
 ) {
  var rellax = new Rellax(".rellax", { center: true })
 }
}

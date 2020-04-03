import Rellax from "rellax"

document.onreadystatechange = () => {
 if (
  document.readyState === "complete" &&
  !!document.querySelector(".rellax")
 ) {
  console.log("hit")

  var rellax = new Rellax(".rellax", { center: true })
 }
}

import { chain, tween, styler, delay } from "popmotion"

const banner = styler(document.querySelector(".banner"))

chain(
 delay(10000),
 tween({ from: { opacity: 1 }, to: { opacity: 0 } }),
 tween({ from: { display: "initial" }, to: { display: "none" } })
).start((v) => banner.set(v))

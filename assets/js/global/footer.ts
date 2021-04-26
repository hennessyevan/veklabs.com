import { chain, tween, styler, delay } from "popmotion"

const bannerEl: HTMLElement = document.querySelector(".banner")
const banner = styler(bannerEl)

chain(
 delay(Number(bannerEl.dataset.delay)),
 tween({ from: { opacity: 1 }, to: { opacity: 0 } }),
 tween({ from: { display: "initial" }, to: { display: "none" } })
).start((v) => banner.set(v))

import type { LinksFunction } from "@remix-run/cloudflare"
import styles from "styles/home.css"

export const Links: LinksFunction = () => [{ rel: "stylesheet", href: styles }]

export default function Index() {
	return "index"
	// 		<section id="videos">
	//   {{ range where .Pages "Section" "videos" }}

	//   {{ range first 1 (where .Pages "Params.featured" true) }}
	//   {{ block "videos/hero" .}}{{ partial "videos/hero.html" . }}{{ end }}
	//   {{ end }}

	//   <div class="video-grid-section">

	//     <div class="video-grid-wrapper"
	//       style='--cols: {{ math.Ceil (div (len (where .Pages "Params.featured" "!=" true)) 2.0) }};'>
	//       <div class="video-grid">
	//         {{ range where .Pages "Params.featured" "!=" true }}
	//         {{ block "videos/list" .}}{{ partial "videos/list.html" . }}{{ end }}
	//         {{ end }}
	//       </div>
	//     </div>

	//     <div class="scroll-arrows">
	//       <span class="arrow-left page-number">
	//         <svg viewBox="0 0 24 24">
	//           <use href="/assets/arrow-left.svg#icon"></use>
	//         </svg>
	//       </span>
	//       <span class="arrow-right page-number">
	//         <svg viewBox="0 0 24 24">
	//           <use href="/assets/arrow-right.svg#icon"></use>
	//         </svg>
	//       </span>
	//     </div>
	//   </div>

	//   {{ end }}
	// </section>
}

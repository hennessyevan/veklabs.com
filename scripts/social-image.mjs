import renderSocialImage from "puppeteer-social-image"
import _ from "lodash"
import toml from "@iarna/toml"
import frontmatter from "gray-matter"
import fs from "fs"
import url from "url"
import path from "path"
import DateFNS from "date-fns"

const __dirname = path.dirname(url.fileURLToPath(import.meta.url))
const postsDir = path.join(path.dirname(""), "./content/reports")
const posts = fs.readdirSync(postsDir)

const cacheFile = path.join(__dirname, "./cache.json")
const cache = JSON.parse(fs.readFileSync(cacheFile)) || {}

function isStale({ originalFile, cachedFile }) {
 if (!fs.existsSync(cachedFile)) return true
 if (!cache[cachedFile]) {
  cache[path] = new Date()
  fs.writeFileSync(cacheFile, JSON.stringify(cache))
  return true
 }
 const mtime = fs.statSync(originalFile).mtime
 if (mtime > cache[cachedFile]) {
  cache[cachedFile] = mtime
  fs.writeFileSync(cacheFile, JSON.stringify(cache))
  return true
 }
 return false
}

for (const post of posts) {
 // Ignore root
 if (post === "_index.md") continue

 try {
  const { data } = frontmatter.read(path.join(postsDir, post), {
   engines: { toml: toml.parse.bind(toml) },
   delimiters: "+++",
   language: "toml",
  })

  const outFileName = _.kebabCase(data.title)

  if (
   isStale({
    originalFile: path.join(__dirname, "../assets", data.image),
    cachedFile: path.join(
     __dirname,
     "../static/social-images",
     outFileName + ".jpg"
    ),
   })
  ) {
   renderSocialImage.default({
    template: "fiftyfifty",
    output: path.join(
     __dirname,
     "../static/social-images",
     outFileName + ".jpg"
    ),
    templateParams: {
     split: "diagonal",
     title: data.title,
     subtitle: data.author,
     logo: `data:image/png;base64,${fs
      .readFileSync(path.join(__dirname, "../assets/images/logo.png"))
      .toString("base64")}`,
     imageUrl: `data:image/jpeg;base64,${fs
      .readFileSync(path.join(__dirname, "../assets", data.image))
      .toString("base64")}`,
     eyebrow: DateFNS.format(new Date(data.date), "d MMMM"),
     watermark: "veklabs.com",
    },
   })
  }
 } catch (error) {
  console.log(error)
 }
}

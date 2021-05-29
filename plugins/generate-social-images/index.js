const toml = require("@iarna/toml")
const DateFNS = require("date-fns")
const fs = require("fs")
const frontmatter = require("gray-matter")
const _ = require("lodash")
const path = require("path")
const renderSocialImage = require("puppeteer-social-image")

async function generateSocialImage(post) {
 try {
  const { data } = frontmatter.read(post, {
   engines: { toml: toml.parse.bind(toml) },
   delimiters: "+++",
   language: "toml",
  })

  if (typeof data.image !== "string") return

  const outFileName = _.kebabCase(data.title)

  renderSocialImage.default({
   templateBody: `
        <div class="social{{#if logo}} social--has-logo{{/if}}{{#if subtitle}} social--has-subtitle{{/if}}" {{#if imageUrl}} style="background-image: url('{{imageUrl}}');"{{/if}}>
        {{#if logo}}<div><img class="logo" src="{{logo}}" /></div>{{/if}}
        <!--{{#if category}}<span class="category">{{category}}</span>{{/if}}-->
          <div class="content">
            <div class="content-inner">
              <h1 class="truncate">{{title}}</h1>
              <div class="details">
                {{#if avatar}}<div><img class="avatar" src="{{avatar}}" /></div>{{/if}}
                <h2 class="truncate">
                {{subtitle}}
                {{#if watermark}} | {{watermark}}{{/if}}
                </h2>
              </div>
            </div>
          </div>
        </div>`,
   templateStyles: `
        * {
          box-sizing: border-box;
        }
        .social {
          display: flex;
          height: 100%;
          width: 100%;
          background: #1c1c1e;
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
          padding: 16px;
        }
        .content {
          border-radius: 16px;
          border: 1px solid #2c2c2e;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          color: white;
          display: flex;
          margin-top: auto;
          flex-direction: column;
        }
        .content-inner {
          flex-grow: 1;
          padding: 40px;
          padding-right: 56px;
          overflow: hidden;
        }
        .logo {
          position: absolute;
          top: 16px;
          right: 24px;
          z-index: 9;
          opacity: 0.8;
          height: 72px;
        }
        .truncate {
          overflow: hidden;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        h1 {
          font-size: 56px;
          margin: 0;
          font-weight: 800;
          -webkit-line-clamp: 6;
        }
        .social--has-logo h1 {
            -webkit-line-clamp: 5;
        }
        .social--has-subtitle h1 {
            -webkit-line-clamp: 4;
        }
        .social--has-subtitle.social--has-logo h1 {
          font-size: 56px;
          -webkit-line-clamp: 4;
        }
        .details {
          display: flex;
          align-items: center;
          margin-top: 16px;
        }
        h2 {
          font-size: 30px;
          -webkit-line-clamp: 4;
          margin: 0;
          font-weight: 500;
        }
        .avatar {
          --size: 56px;
          width: var(--size);
          height: var(--size);
          border-radius: 999px;
          margin-right: 16px;
        }
        .social--has-logo h2 {
          -webkit-line-clamp: 2;
        }
        `,
   type: "png",
   templateParams: {
    title: data.title,
    subtitle: data.author,
    logo: `data:image/png;base64,${fs
     .readFileSync(path.join(__dirname, "../../assets/images/logo.png"))
     .toString("base64")}`,
    category: data.category,
    imageUrl: `data:image/jpeg;base64,${fs
     .readFileSync(path.join(__dirname, "../../assets", data.image))
     .toString("base64")}`,
    avatar: getAvatar(data.author),
    eyebrow: DateFNS.format(new Date(data.date), "d MMMM"),
    watermark: "veklabs.com",
   },
   output: path.join("static/social-images", outFileName + ".jpg"),
  })
 } catch (error) {
  console.log(error)
 }
}

async function getAvatar(author) {
 try {
  const authorMd = path.join(__dirname, "../../content/team", author + ".md")

  const { data } = frontmatter.read(authorMd, {
   engines: { toml: toml.parse.bind(toml) },
   delimiters: "+++",
   language: "toml",
  })

  return `data:image/jpeg;base64,${fs
   .readFileSync(path.join(__dirname, "../../assets", data.image))
   .toString("base64")}`
 } catch (error) {
  return ""
 }
}

module.exports = {
 onPreBuild: async ({ utils: { git, build } }) => {
  const reports = git.fileMatch("./content/reports/**/*.md")
  if (!Object.values(reports).some((files) => files.length)) {
   console.log("no reports changed")
   return
  }

  const { modified, created, deleted } = reports

  if (modified.length || created.length) {
   for (const post of modified) {
    await generateSocialImage(post)
   }
  }

  if (deleted.length) {
   // TODO: Implement delete function if needed
  }

  console.log(reports)
 },
}

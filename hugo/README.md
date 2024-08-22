# Veklabs

[![Netlify Status](https://api.netlify.com/api/v1/badges/b8fd8ebd-5695-4874-a618-046c1b284833/deploy-status)](https://app.netlify.com/sites/veklabs/deploys)

## Adding Content

#### Videos

Video data is stored in [content/videos](content/videos).

Each video is made with an md file. You can either copy/paste to create new videos or use the terminal command `hugo new videos/{video name}.md`

The structure is written in [TOML](https://learnxinyminutes.com/docs/toml/) but can also be in JSON or YAML and is as follows:

```md
+++ <- Indicates beginning/end of data
title = 'Demo Reel'
main = true <- Whether this is the hero video (set on only one video)
url = "vimeo.com/x" <- vimeo url
image = "1_Demo_Reel.jpg" <- thumbnail file name
+++
```

_Place the thumbnail image in the [content](content) directory._

#### Posts

Blog Posts are stored in [content/blog](content/blog)

Frontmatter is also in [TOML](https://learnxinyminutes.com/docs/toml/) and currently has the following structure:

```md
+++
 title = "Some Post" (required)
 date = 2020-03-23 (required)
 image = "images/andrew_1a.jpg" (required)
 category = "Marketing" (required)
+++
```

> The Hero Image occupies a 5:2 aspect ratio

Markdown in this blog follows the CommonMark Spec with some additions.

For a good markdown reference refer to: [Github Markdown Cheatsheet](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet)

This site also includes some quality-of-life improvements but also some workarounds to be aware of.

##### Images

Images are shown with the syntax: `![float](url "caption")`.

The float is either `left`, `right` or `full` for positioning images on the left or right of text in blog posts or spanning the across the whole post.

The url specifies the url of the image and is required.

The caption is optional and adds a caption.

> Important: The hero image is specified in the frontmatter as `title = "Your Title"` and must be placed in `assets/images` so that we can do some fancy SEO stuff. Images that are used in the markdown, i.e. in the content of the post, must be placed in `static/images` instead.

#### Shortcodes

There are a few shortcodes available for use.

They are wrapped with `{{< shortcode >}}`

All shortcodes can be found here: [Hugo Shortcodes](https://gohugo.io/content-management/shortcodes/#youtube)

For vimeo use this shortcode with the video ID:
`{{< vimeo 146022717 >}}`

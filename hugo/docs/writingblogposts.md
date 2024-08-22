## Structure

Blog Posts have two parts
1. [TOML](#toml)
2. [Markdown](#markdown)

```md
+++ These denote the TOML area

  ...Some TOML in here

+++

Here, below the TOML is where the markdown goes.
```

## TOML
`TOML` stands for Tom's Obvious Minimal Language, it was created by Tom Preston-Werner (the founder of Github). Our blog posts use this format to specify fields pertaining to the post. These fields are commonly referred to as the _"front matter"_.

The Vek Labs blog currently has these fields available:

| Field    | Description                                                                                                     | Required |
| -------- | --------------------------------------------------------------------------------------------------------------- | -------- |
| title    | The title of the post. This is used in the post and in SEO                                                      | `true`   |
| date     | The publish date of the post. This must be given in the format `YYYY-MM-DD` e.g. 2020-03-23.                    | `true`   |
| image    | The hero image of the post. This is used in the post and in SEO. Hero images must be placed in `/assets/images` | `true`   |
| category | Puts the post in a category. This is used to suggest related posts and is used in SEO.                          | `true`   |
| author   | The author of the post. Using a team member's name provides additional functionality.                           | `false`  |
| keywords | A comma separated list of keywords to be used in SEO.                                                           | `false`  |

#### Example
```md
+++
 title = "Make Your Content Work For You"
 date = 2020-03-23
 image = "images/Make-Your-Content-Work-For-You-Vek-Labs.png"
 category = "Content Creation"
 author = "Andrew Peloso"
 keywords = "marketing,content creation,brand"
+++
```

## Markdown
`Markdown` is a file format that allows for rich text within the context of a plain text field. This is used in places like Slack, Github, Reddit, etc. This blog uses a modified version of the [Commonmark Markdown spec](https://commonmark.org/help/). Notably it additionally supports [smartypants punctation](https://daringfireball.net/projects/smartypants/), various [shortcodes](#shortcodes), as well as a table of contents.

The body of the post includes anything below the end of the TOML section denoted by the final `+++`

### Inline Images
Images that are placed in the body of the post are denoted with the usual markdown convention `![]()` however for ease of use in this blog, some of the syntax plays double-duty.

 - **!** Denotes an image
 - **[]** Optionally overrides the position of the image
   - Available positions: left, right, full
 - **()** Specifies the url of the image and an optional caption
   - Can be a web url like `"https://imagesite.com/image.jpg"`
   - If the image is local it must be placed in `/static/images`

#### Example
`![left](/images/blogimage.jpg "This is a caption")`

### Shortcodes
This blog has a number of shortcodes. They can be added inline wrapped in ``{{<  >}}``. e.g. `{{< vimeo 13841235 >}}`

#### Instagram
Photo ID can be discerned from the URL `https://www.instagram.com/p/BWNjjyYFxVx/`

`{{< instagram BWNjjyYFxVx >}}`

Optionally hide the caption

`{{< instagram BWNjjyYFxVx hidecaption >}}`


#### Tweet
Use the id as in this url `https://twitter.com/spf13/status/877500564405444608`

`{{< tweet 877500564405444608 >}}`

#### Vimeo
Use the ID e.g. `https://vimeo.com/channels/staffpicks/146022717`

`{{< vimeo 146022717 >}}`

#### Youtube
Use the ID e.g. `https://www.youtube.com/watch?v=w7Ft2ymGmfc`

`{{< youtube w7Ft2ymGmfc >}}`

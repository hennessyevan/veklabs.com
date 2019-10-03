# Veklabs

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
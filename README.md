# iconbin
Community-driven API for icons.  
[iconbin.com](http://iconbin.com)

## What is it?
Undocumented favicon services. In conjunction with Feeds and Readitlater. Can be used in functional prototypes or any other templating situation. This is made possible because <img> tags accept redirected sources, meaning that the target image is displayed in your HTML. 

## How it works
Cached indefinitely. The caveat of course being that you might not receive updated icons. For this, you can have your sources point to /src, which will resolve to the latest version. At the moment, until I see bottlenecking, icon data is hosted on  Github with RawGit as the CDN, the url mapping is cached through a Node express app in-memory. Github file quotas should allow for the next 5k icons or so.

## Contributing
Remember to [sync your fork](https://help.github.com/articles/syncing-a-fork/) to the upstream iconbin repository.

## FAQ
Q: Why mix different filetypes?
A: As much as i’d like for SVG to be the default,
most icons out there are bitmaps. And in that regard,
the different file types have their strengths. JPG may be more suited to detailed works while PNG has an alpha channel. If we move to our own hosting, then we’d also offer dynamic file types – e.g. WebP over JPEG based on the clients Accept-Content headers.

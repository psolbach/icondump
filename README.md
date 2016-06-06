# iconbin
This is the data repository for [iconbin.com](http://iconbin.com), a directory of beautiful favicons and icons of all variety via API – driven by the community and made available through a CDN. This very much hinges on contributions, so please go ahead. Read more about it [here](https://psolbach.com/write/icons-by-api-iconbin-image-assets-brands-logos-5).

## How it works
Unlike the few favicon services out there, iconbin does not replicate the `favicon.ico`. Instead it relies entirely on manual labor to provide nice, large and up-to-date icons via this repository. Borne out of frustration with the development of feed-reading apps and the hazzle of looking up, caching small and unbecoming favicons, this can be used in functional prototypes or any other templating situation. Throw a domain name at the API and it will yield. This is possible because <img> tags accept redirected sources, meaning that the target image is displayed in your HTML.

Icons are cached infinitely through [MaxCDN](https://www.maxcdn.com/). The caveat of course being that you might not receive updated icons if you use the CDN url. Instead, you can point your sources to `iconbin.com/api/foo.com/src`, which will resolve to the latest version. At the moment, until I see bottlenecking, icon data is hosted on Github through [RawGit](https://rawgit.com/), the url mapping is cached through a Node express app in-memory. Github file quotas should allow for the next 5k icons or so.

## Contributing
To add an icon, simply place it in `/res` and add its metadata to `icons.json`. Icons should be square, measure at least 300 pixels and have a filename in the format `foo.com.png` or `xyz.foo.com.jpg`, where foo should be the canonical domain name. Then you reference this canonical icon name in urls.json and map  any additional short domains or commonly used CNAME domains to the canonical one, e.g. nyt.com maps to nytimes.com. We disregard www as its just a subdomain. Before doing the PR you should remember to [sync your fork](https://help.github.com/articles/syncing-a-fork/) with any changes made upstream. To avoid any collisions, PRs will be processed in the order of their filing.

## FAQ
Q: Why mix different filetypes?
A: As much as we all love SVG and would like for it to be the default, most icons out there are bitmaps. And to be fair,
the different file types have their strengths. JPG may be more suited to detailed works while PNG has an alpha channel. A future scenario might be dynamic file types – e.g. WebP over JPEG based on the clients Accept-Content headers.

## License
All icon resources in this repository are the property of their respective copyright holders. This is a (1) not-for-profit community driven offering with the sole aim of providing developers with a fast, easy way of displaying brand information in the best way possible and thus having a (2) positive effect on the recognition and potential market of these brands. In summary, this application of copyrighted material should be generally covered by Fair Use or comparable licence doctrines. Iconbin is not intended to be used in commercial environments. Should you find your corporate identity in any way misrepresented, please get in touch ASAP at a@iconbin.com or better still, do a Pull Request with the correct icon data and send us a corresponding license note to be displayed in context of this repository and iconbin.com. The metadata itself is licensed under MIT License (MIT).

[(1)](https://ucomm.wsu.edu/fair-use/#toc-purpose-and-character-of-the-use)
[(2)](https://ucomm.wsu.edu/fair-use/#toc-commercial-effect)

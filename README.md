# 👷 `image-lazy-loading` 
## A sample lazy loading & CDN worker for a Ghost Blog using Casper

This code was created [as part of this tutorial article](https://www.paolotagliaferri.com/how-to-make-ghost-blog-super-fast-page-experience/)

This worker runs on [Cloudflare](https://workers.cloudflare.com/) and does two things

1. Looks for `img` tags that have specific classes, and adds the `loading=lazy` attribute to them
2. Looks up for images that are being served directly from your blog's content images and rewrites them to pull from a CDN URL

For example, you can use Cloudflare's [image resizing URL scheme](https://developers.cloudflare.com/images/about) Cloudinary's Remote image fetch URL [as shown here](https://cloudinary.com/documentation/fetch_remote_images#remote_image_fetch_url)

The worker has two environment variables that needs to be set in your `wrangler.toml` file alongside the other options.
See the provided `wrangler.toml.example` included in this repository

#### Wrangler

For ease of use, this script should be managed using Wrangler.
Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).

#### Setup

1. Clone the repository and set up `wrangler`
2. Add a `wrangler.toml` file to your folder `cp wrangler.toml.example wrangler.toml`
3. Edit the file, adding your Cloudflare Account Id, Route, Zone ID and the `ENV_LOCAL_CONTENT_URL`, `ENV_CDN_FETCH_URL`, `ENV_ENABLE_CDN_IMAGE` values
4. Test your changes
5. Once happy, run `wrangler publish` to deploy the worker and route to your zone

Example `wrangler.toml` set up (pay attention to trailing slashes)
* `route = https://www.yourblog.com/*` 
* `ENV_LOCAL_CONTENT_URL = https://www.yourblog.com/content/images`
* Cloudflare ` ENV_CDN_FETCH_URL= https://<your zone domain>/cdn-cgi/image/format=auto,metadata=copyright,quality=85/
* Cloudinary `ENV_CDN_FETCH_URL = https://res.cloudinary.com/<YOUR CLOUDINARY USER>/image/fetch/q_auto,f_auto,dpr_auto/`
* `ENV_ENABLE_CDN_IMAGE = on`


#### Contributors

[Stanislas](https://github.com/angristan/) for the [original idea](https://stanislas.blog/2020/05/native-image-lazy-loading-ghost-cloudflare-worker/) 

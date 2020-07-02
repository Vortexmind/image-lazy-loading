# 👷 `image-lazy-loading` 
## A sample lazy loading & CDN worker for a Ghost Blog using Casper

This worker runs on [Cloudflare](https://workers.cloudflare.com/) and does two things

1. Looks for `img` tags that have specific classes, and adds the `loading=lazy` attribute to them
2. Looks up for images that are being served directly from your blog's content images and rewrites them to pull from a CDN URL

You can use Cloudinary's Remote image fetch URL [as shown here](https://cloudinary.com/documentation/fetch_remote_images#remote_image_fetch_url)

The worker has two environment variables that needs to be set in your `wrangler.toml` file alongside the other options.
See the provided `wrangler.toml.example` included in this repository

#### Wrangler

Further documentation for Wrangler can be found [here](https://developers.cloudflare.com/workers/tooling/wrangler).

#### Contributors

[Stanislas](https://github.com/angristan/) for the [original idea](https://stanislas.blog/2020/05/native-image-lazy-loading-ghost-cloudflare-worker/) 

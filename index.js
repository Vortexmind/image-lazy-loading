addEventListener('fetch', event => {
  event.respondWith(handleRequest(event))
})

const EXCLUDED_PATHS = ["/ghost","/rss","/content","/assets"]
const IMG_SELECTORS = ["kg-image", "post-card-image"]
const CDN_IMG_SELECTORS = ["kg-image", "post-card-image", "feature-image"]

class ElementHandler {
  element(element) {

      const imgClass = element.getAttribute('class') || ''
      const imgSrc = element.getAttribute('src') || ''

      if (IMG_SELECTORS.some( val => imgClass.includes(val) )) {
        // Add lazy loading if not defined already
        if(!element.getAttribute('loading')  ) {
          element.setAttribute('loading', 'lazy')
        }
      }

      if (ENV_ENABLE_CDN_IMAGE === "on" && CDN_IMG_SELECTORS.some( val => imgClass.includes(val) )) {
          // If image is loaded from local content, rewrite to pull from CDN
          if(imgSrc.startsWith(ENV_LOCAL_CONTENT_URL)) {
            element.setAttribute('src',ENV_CDN_FETCH_URL+imgSrc)
          }
      }
  }
}

async function handleRequest(event) {
  
  const pathname = new URL(event.request.url).pathname.toLowerCase()
  const res = await fetch(event.request)
  
  if (EXCLUDED_PATHS.some( val => pathname.startsWith(val) )) { 
    return res
  } else { 
    return new HTMLRewriter().on('img', new ElementHandler()).transform(res)
  }
}

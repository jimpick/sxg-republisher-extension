const hostMappings = {}
let redirectCount = 0
let redirectTimestamp = 0

const indexPage = 'https://index-jimpick.ipfs.v6z.me/'

async function addMapping (host) {
  const now = Date.now()
  if (!hostMappings[host]) {
    hostMappings[host] = { timestamp: 0 }
  }
  if (hostMappings[host].timestamp + 5000 < now) {
    hostMappings[host].timestamp = now
    delete hostMappings[host].error
    console.log('addMapping', host, now)

    const assetUrl = `https://ipfs.io/api/v0/dns/${host}?r=true`
    const assetRes = await fetch(assetUrl)
    const assetJson = await assetRes.json()
    const assetPath = assetJson.Path
    if (!assetPath) {
      const errMsg = `Couldn't find dnslink for ${host}`
      hostMappings[host].error = errMsg
      console.error(errMsg)
      return
    }
    const assetMatch = assetPath.match(/^\/ipfs\/(.*)$/)
    if (!assetMatch) {
      const errMsg = `No /ipfs/ in assetPath ${assetPath}`
      hostMappings[host].error = errMsg
      console.error(errMsg)
      return
    }
    hostMappings[host].assetsCid = assetMatch[1]

    const sxgUrl = `https://ipfs.io/api/v0/dns/sxg.${host}?r=true`
    const sxgRes = await fetch(sxgUrl)
    const sxgJson = await sxgRes.json()
    const sxgPath = sxgJson.Path
    if (!sxgPath) {
      const errMsg = `Couldn't find dnslink for sxg.${host}`
      hostMappings[host].error = errMsg
      console.error(errMsg)
      return
    }
    const sxgMatch = sxgPath.match(/^\/ipfs\/(.*)$/)
    if (!sxgMatch) {
      const errMsg = `No /ipfs/ in sxgPath ${sxgPath}`
      hostMappings[host].error = errMsg
      console.error(errMsg)
      return
    }
    hostMappings[host].sxgCid = sxgMatch[1]

    console.log('addMapping done', host, hostMappings[host])
  }
}

chrome.webRequest.onBeforeRequest.addListener(
  function (info) {
    console.log("Url: " + info.url)

    const { host, pathname, hash } = new URL(info.url)
    addMapping(host)
    let path = pathname
    if (path.endsWith('/')) {
      path += 'index.html'
    }
    if (!path.match(/\.[^.]+$/)) {
      path += '/index.html'
    }
    const mapping = hostMappings[host]
    const now = Date.now()
    if (mapping && mapping.error && mapping.timestamp + 2000 > now) {
      return {
        redirectUrl: 'data:text/html,' +
        `Error: ${mapping.error}<br>` +
        `Try again? <a href="${info.url}">${info.url}</a><br>` +
        `Index page: <a href="${indexPage}">${indexPage}</a><br>`
      }
    }
    if (
      !mapping ||
      !mapping.assetsCid ||
      !mapping.sxgCid
    ) {
      if (redirectTimestamp + 2000 < now) {
        redirectCount = 0
      }
      redirectCount++
      redirectTimestamp = now
      if (redirectCount > 5) {
        return {
          redirectUrl: 'data:text/html,' +
          `Failed to load<br>` +
          `Try again? <a href="${info.url}">${info.url}</a><br>` +
          `Index page: <a href="${indexPage}">${indexPage}</a><br>`
        }
      }
      return {
        redirectUrl: 'data:text/html,' +
          'Loading... ' + redirectCount +
          '<script>' +
          `setTimeout(() => document.location.href = "${info.url}", 1000);` +
          '</script>'
      }
    }
    if (path.endsWith('.html')) {
      return {
        redirectUrl: `https://ipfs.io/ipfs/${mapping.sxgCid}${path}.sxg${hash}`
      }
    }
    return {
      redirectUrl: `https://ipfs.io/ipfs/${mapping.assetsCid}${path}${hash}`
    }
  },
  // filters
  {
    urls: [
      "*://ipfs.v6z.me/*",
      "*://*.ipfs.v6z.me/*"
    ]
  },
  // extraInfoSpec
  ["blocking"]
)


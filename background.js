chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    console.log("Url: " + info.url)

    const { host, pathname } = new URL(info.url)
    let path = pathname
    if (path.endsWith('/')) {
      path += 'index.html'
    }
    if (!path.match(/\.[^.]+$/)) {
      path += '/index.html'
    }
    /*
    if (host === 'ipfs.v6z.me') {
      const cid = 'QmUd1WPNTbiqDFpaGqTaUN16U6VAppqqjSQSi6KQxjjbfA'
      return {
        redirectUrl: `https://ipfs.jimpick.com/ipfs/${cid}${sxgPath}`
      }
    }
    if (host === 'tokyo.ipfs.v6z.me') {
      const cid = 'QmR5i7DRxHQinAuCuJ1AVSQpft4QZUtQkSQWLcz7RbSCe5'
      return {
        redirectUrl: `https://ipfs.jimpick.com/ipfs/${cid}${sxgPath}`
      }
    }
    if (host === 'vancouver.ipfs.v6z.me') {
      const cid = 'QmSXovaJVapu1B5oxApghHCg5o7eVdxg5BGHyK92oCdquc'
      return {
        redirectUrl: `https://ipfs.jimpick.com/ipfs/${cid}${sxgPath}`
      }
    }
    */
    if (host === 'ipfs-docs-jimpick.ipfs.v6z.me') {
      const cid = 'QmSr6MvvPWMzUaiuoWye713tWxxmyunMuK11DZytzcy8oS'
      const assetsCid = 'QmXSHCEUJfFhGvw6U1aSuMtSTSnCmWcwvnCHdSZwbfRyer'
      if (path.endsWith('.html')) {
        return {
          redirectUrl: `https://ipfs.jimpick.com/ipfs/${cid}${path}.sxg`
        }
      }
      return {
        redirectUrl: `https://ipfs.jimpick.com/ipfs/${assetsCid}${path}`
      }
    }
    return {
      redirectUrl: 'https://ipfs.jimpick.com/ipfs/QmU8j8nEf1VVzb5RMqfQgp9RqE9XxtZBEcS8HTkaZSYzTj/ipfs.v6z.me.hello.sxg'
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

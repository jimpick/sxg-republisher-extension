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
    if (host === 'ipld-jimpick.ipfs.v6z.me') {
      const cid = 'QmQCLv8ogu3t8t6HczbwpyJTGinmketphzE69z1nCsKkcJ'
      const assetsCid = 'QmXb2bKQdgNhC7vaiKQgXFtt7daUZD382L54UTTNXnwQTD'
      if (path.endsWith('.html')) {
        return {
          redirectUrl: `https://ipfs.io/ipfs/${cid}${path}.sxg`
        }
      }
      return {
        redirectUrl: `https://ipfs.io/ipfs/${assetsCid}${path}`
      }
    }
    if (host === 'peerpad-jimpick.ipfs.v6z.me') {
      const cid = 'QmeeMqA8BAcAxQe58f3E886xS4JvNSRR3uz6CivPgsGMDS'
      const assetsCid = 'QmWbsqqqG9YpNYDt5afp6HY8TrKMtCtdGUtUfgkS9fRYeH'
      if (path.endsWith('.html')) {
        return {
          redirectUrl: `https://ipfs.io/ipfs/${cid}${path}.sxg`
        }
      }
      return {
        redirectUrl: `https://ipfs.io/ipfs/${assetsCid}${path}`
      }
    }
    if (host === 'ipfs-docs-jimpick.ipfs.v6z.me') {
      const cid = 'QmTXhjNmRiM5yL4mNs2bcq4MTZDkr1x5b8K2W41UdAGJqJ'
      const assetsCid = 'QmXSHCEUJfFhGvw6U1aSuMtSTSnCmWcwvnCHdSZwbfRyer'
      if (path.endsWith('.html')) {
        return {
          redirectUrl: `https://ipfs.io/ipfs/${cid}${path}.sxg`
        }
      }
      return {
        redirectUrl: `https://ipfs.io/ipfs/${assetsCid}${path}`
      }
    }
    if (host === 'index-jimpick.ipfs.v6z.me') {
      const cid = 'QmcgNj5wdUW5aRCdoimgFYqkkD2TLafTwzwjcudYpqGxeT'
      const assetsCid = 'Qmcz7jdZPumWFdPFVJq7s3dWTZMFHtMVHyjurRthdMsNNi'
      if (path.endsWith('.html')) {
        return {
          redirectUrl: `https://ipfs.io/ipfs/${cid}${path}.sxg`
        }
      }
      return {
        redirectUrl: `https://ipfs.io/ipfs/${assetsCid}${path}`
      }
    }
    return {
      // redirectUrl: 'https://ipfs.io/ipfs/Qmcz7jdZPumWFdPFVJq7s3dWTZMFHtMVHyjurRthdMsNNi/'
      redirectUrl: 'https://index-jimpick.ipfs.v6z.me/'
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


chrome.webRequest.onBeforeRequest.addListener(
  function(info) {
    console.log("Url: " + info.url);
    // Redirect the lolcal request to a random loldog URL.
    return {
      redirectUrl: 'https://ipfs.jimpick.com/ipfs/QmU8j8nEf1VVzb5RMqfQgp9RqE9XxtZBEcS8HTkaZSYzTj/ipfs.v6z.me.hello.sxg'
    };
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
);

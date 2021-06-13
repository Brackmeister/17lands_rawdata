function listener(details) {
  const filter = browser.webRequest.filterResponseData(details.requestId);
  const decoder = new TextDecoder("utf-8");
  const encoder = new TextEncoder();

  let data = "";

  filter.ondata = (event) => {
    const str = decoder.decode(event.data, { stream: true });
    data += str;

    filter.write(event.data);
  };

  filter.onstop = (event) => {
    filter.close();

    browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
      const tab = tabs[0];
      if (tab) {
        browser.tabs.sendMessage(tab.id, data);
      } else {
        console.log("no active tab");
      }
    });
  };
}

browser.webRequest.onBeforeRequest.addListener(
  listener,
  {
    urls: ["https://www.17lands.com/data/collection*"],
    types: ["xmlhttprequest"],
  },
  ["blocking"]
);

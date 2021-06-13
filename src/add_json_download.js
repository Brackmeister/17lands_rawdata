let cardlistJson;

const addDownloadButton = () => {
  const expansionSelect = document.getElementById("expansion");

  let downloadButtonDiv = document.getElementById("downloadButtonDiv");

  if (!downloadButtonDiv) {
    downloadButtonDiv = document.createElement("div");
    downloadButtonDiv.classList.add("col-xs-1");
    downloadButtonDiv.setAttribute("id", "downloadButtonDiv");

    const downloadButton = document.createElement("a");
    downloadButton.innerHTML = "Download JSON";
    downloadButton.setAttribute("id", "downloadButton");

    downloadButtonDiv.appendChild(downloadButton);

    expansionSelect.parentNode.parentNode.append(downloadButtonDiv);
  }
};

const updateDownloadBlob = () => {
  const downloadButton = document.getElementById("downloadButton");
  const expansionSelect = document.getElementById("expansion");

  if (downloadButton.getAttribute("href")) {
    window.URL.revokeObjectURL(downloadButton.getAttribute("href"));
  }

  const blob = new Blob([cardlistJson], { type: "application/json" });
  const url = window.URL.createObjectURL(blob);
  downloadButton.setAttribute("href", url);
  downloadButton.setAttribute("download", `${expansionSelect.value}.json`);
};

addDownloadButton();

browser.runtime.onMessage.addListener((request) => {
  cardlistJson = request;
  updateDownloadBlob();
});

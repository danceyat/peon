/**
  * @method
  * @param {Type} url resource url
  * @param {Type} body request body
  * @param {Type} filename the name of finally saved file
  * @returns
  * @desc This function set a GET request to get some query string which<br/>
  * will be used later, after that downloading will start.
  */
function downloadImageBackground(url, body, filename) {
  console.info(`start downloading '${filename}' ...`);

  browser.downloads.download({
    url: url,
    filename: filename,
    saveAs: false,
    method: 'POST',
    headers: [
      {
        'name': 'Content-Type',
        'value': 'application/x-www-form-urlencoded'
      }
    ],
    body: body
  }).then(() => {
    console.info(`'${filename}' downloaded`);
  }, () => {
    console.error(`failed to download '${filename}'`);
  });
}

browser.runtime.onMessage.addListener((message) => {
  if (message.command === 'download') {
    downloadImageBackground(message.url, message.body, message.filename);
  }
});

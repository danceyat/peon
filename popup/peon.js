/**
 * @method
 * @param
 * @returns
 * @desc This function add a listener for click event on popup page.
 */
function listenForClicks() {
  document.addEventListener("click", (e) => {

    /*
     * @method
     * @param {Type} tabs an array of tabs.Tab objects
     * @returns
     * @desc This function send a message to content script.<br/>
     * The message indicates type of files that user wants to download.
     */
    function startWork(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: e.target.id
      }).then(() => {
        // our work is done, close popup here
        window.close();
      }).catch((error) => {
        console.error(`failed to send message: ${error}`);
      });
    }

    // only cares about elements who have 'button' class
    if (e.target.classList.contains("button")) {
      browser.tabs.query({active: true, currentWindow: true})
      .then(startWork)
      .catch((error) => {
        console.error(`failed to start work: ${error}`);
      });
    }
  });
}

// inject a content script then start waiting for click event
browser.tabs.executeScript({file: "/content_scripts/peons.js"})
.then(listenForClicks)
.catch((error) => {
  console.error(`failed to execute content script: ${error}`);
});

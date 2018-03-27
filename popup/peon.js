function listenForClicks() {
  document.addEventListener("click", (e) => {

    function startWork(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: e.target.id
      }).then(() => {
        window.close();
      }).catch((error) => {
        console.error(`Could not send message: ${error}`);
      });
    }

    if (e.target.classList.contains("button")) {
      browser.tabs.query({active: true, currentWindow: true})
      .then(startWork)
      .catch((error) => {
        console.error(`Could not start work: ${error}`);
      });
    }
  });
}

//browser.tabs.executeScript({file: "/content_scripts/jquery-3.3.1.min.js"})
browser.tabs.executeScript({file: "/content_scripts/peons.js"})
.then(listenForClicks)
.catch((error) => {
  console.error(`Failed to execute content script: ${error.message}`);
});
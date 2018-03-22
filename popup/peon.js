function listenForClicks() {
  document.addEventListener("click", (e) => {
    function startWork(tabs) {
      browser.tabs.sendMessage(tabs[0].id, {
        command: e.target.id
      });
    }

    function reportError(error) {
      console.error(`Could not start work: ${error}`);
    }

    if (e.target.classList.contains("button")) {
      browser.tabs.query({active: true, currentWindow: true})
        .then(startWork)
        .catch(reportError);
      window.close();
    }
  });
}

function reportExecuteScriptError(error) {
  console.error(`Failed to execute peon content script: ${error.message}`);
}

browser.tabs.executeScript({file: "/content_scripts/peons.js"})
.then(listenForClicks)
.catch(reportExecuteScriptError);

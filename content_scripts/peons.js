(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function downloadAllImages() {
    console.log(`begin download`);
  }

  function downloadAllPDFs() {

  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "img") {
      downloadAllImages();
    } else if (message.command === "pdf") {
      downloadAllPDFs();
    }
  });

})();

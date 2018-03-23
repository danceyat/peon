(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function downloadAllImages() {
    console.info(`begin download image`);
    var node = $("input#ContentPlaceHolder1_BLNoTextBox");
    if (node != null)
      console.info(`ok`);
    //console.info(`${serialNo}`);
    console.info(`end download image`);
  }

  function downloadAllPDFs() {
    console.info(`begin download PDF`);
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "img") {
      downloadAllImages();
    } else if (message.command === "pdf") {
      downloadAllPDFs();
    }
  });

})();

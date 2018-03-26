(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function downloadImage(boxNo, imgLink) {
    console.info(`working on box: ${boxNo}`);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', imgLink);

/*
    xhr.setRequestHeader('host', window.location.host);
    xhr.setRequestHeader('Referer', window.location.href);
    xhr.setRequestHeader('Upgrade-Insecure-Requests', '1');
    xhr.setRequestHeader('User-Agent', navigator.userAgent);
*/
    xhr.send();
  }

  function downloadAllImages() {
    try {
      console.info(`>>> begin downloading image <<<`);
      //var node = $("input#ContentPlaceHolder1_BLNoTextBox");
      var serialNo = document.getElementById("ContentPlaceHolder1_BLNoTextBox").value;
      console.info(`obtain serial: ${serialNo}`);

      var rows = document.getElementById("ContentPlaceHolder1_GridView1").getElementsByClassName("gvr");
      var imgLinks = {};
      for (var i = 0; i < rows.length; i++) {
        if (rows[i].hasAttribute("class") && rows[i].getAttribute("class") === "gvr") {
          var boxNo = rows[i].children[1].children[0].innerHTML;
          var imgLink = rows[i].children[9].children[0].href;
          if (boxNo in imgLinks) {
            throw "duplicated box numbers detected";
          }
          imgLinks[boxNo] = imgLink;
          //console.info(`box: ${boxNo}, link: ${imgLink}`);
        }
      }
      console.info(`obtain ${imgLinks.length} boxNo`);

      for (var boxNo in imgLinks) {
        downloadImage(boxNo, imgLinks[boxNo]);
        break;
      }

      console.info(`>>> finish downloading image <<<`);
    } catch (ex) {
      console.error(`${ex}`);
      console.info(`aborting...`);
    }
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

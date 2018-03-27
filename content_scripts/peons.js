(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  /**
   * @method
   * @param {Type} container container number
   * @param {Type} url resource url
   * @returns
   * @desc This function set a GET request to get some query string which<br/>
   * will be used later, after that downloading will start.
   */
  function downloadOneImage(container, url) {
    console.info(`gathering info for '${container}'...`);

    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.responseType = "document";

    xhr.onreadystatechange = function () {
      if (xhr.readyState == 4 && xhr.status == 200) {
        var arg1 = xhr.response.getElementById('__VIEWSTATE').value;
        var arg2 = xhr.response.getElementById('__EVENTVALIDATION').value;
        var body = '__VIEWSTATE=' + arg1 + '&__EVENTVALIDATION=' + arg2;
        body += '&BtnDownAll=%E4%B8%8B%E8%BD%BD%E5%85%A8%E9%83%A8';

        console.info(`'${container}' info received, prepare for downloading...`);

        browser.runtime.sendMessage({
          'command': 'download',
          'url': url,
          'filename': container + '.zip',
          'body': body
        });

      }
    };

    xhr.send();
  }

  /**
   * @method
   * @param
   * @returns
   * @desc This function parses DOM and collect image urls.
   */
  function downloadImages() {
    try {
      console.info(`parsing...`);
      /**
       * jQuery just doesn't work here
       */
      //var node = $("input#ContentPlaceHolder1_BLNoTextBox");

      //var serialNo = document.getElementById("ContentPlaceHolder1_BLNoTextBox").value;
      //console.info(`obtain serial: ${serialNo}`);

      var rows = document.getElementById("ContentPlaceHolder1_GridView1").getElementsByClassName("gvr"), urls = {};
      console.info(`got ${rows.length} container(s) on current page`);
      for (var i = 0; i < rows.length; i++) {
        var container = rows[i].children[1].children[0].innerHTML;
        var url = rows[i].children[9].children[0].href;
        if (container in urls) {
          throw "duplicated box numbers detected";
        }
        urls[container] = url;
        //console.info(`box: ${container}, link: ${url}`);
      }

      for (var container in urls) {
        downloadOneImage(container, urls[container]);
      }
    } catch (ex) {
      console.error(`unhandled exception: ${ex}`);
      console.info(`abort`);
    }
  }

  // add a listener
  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "img") {
      downloadImages();
    } else if (message.command === "pdf") {
      console.error(`not implemented yet`);
    }
  });

})();

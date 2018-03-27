(function() {
  if (window.hasRun) {
    return;
  }
  window.hasRun = true;

  function downloadImage(boxNo, imgLink) {
    console.info(`working on box: ${boxNo}`);

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      //console.info(`readyState=${xhr.readyState}, status=${xhr.status}`);
      if (xhr.readyState == 4 && xhr.status == 200) {
        //var headers = xhr.getAllResponseHeaders();
        //console.info(`headers: ${headers}`);
        //console.info(`response: ${xhr.response}`); 
        var r = xhr.response;
        var viewstate = r.getElementById('__VIEWSTATE').value;
        var eventvalidation = r.getElementById('__EVENTVALIDATION').value;
        var btndownall = 'BtnDownAll=%E4%B8%8B%E8%BD%BD%E5%85%A8%E9%83%A8';

        viewstate.replace(/\//g, "%2F");
        eventvalidation.replace(/\//g, "%2F");

        console.info(`__VIEWSTATE=${viewstate}`);
        console.info(`__EVENTVALIDATION=${eventvalidation}`);

        browser.runtime.sendMessage({
          'imgLink': imgLink,
          'boxNo': boxNo,
          'viewstate': viewstate,
          'eventvalidation': eventvalidation,
          'btndownall': btndownall
        });

/*
        var xhr2 = new XMLHttpRequest();
        xhr2.onreadystatechange = function () {
          console.info(`readyState=${xhr2.readyState}, status=${xhr2.status}`);
          if (xhr2.readyState == 4 && xhr2.status == 200) {
            var r2 = xhr2.response;
            var blob = new Blob([xhr2.response], {type: "octet/stream"});
            var filename = boxNo + ".zip";
            saveAs(blob, filename);
            //console.info(`${r2}`);
            console.info(`received`);
          }
        }
*/
        //xhr2.open('POST', imgLink);

        //xhr2.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
        //xhr2.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //xhr2.setRequestHeader('Upgrade-Insecure-Requests', '1');
        //xhr2.responseType = "arraybuffer";

        //xhr2.send('__VIEWSTATE'+'='+viewstate+'&'+'__EVENTVALIDATION'+'='+eventvalidation+'&'+btndownall);

        //var imgHeader = {};
        //imgHeader['Accept'] = 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8';
        //imgHeader['Content-Type'] = 'application/x-www-form-urlencoded';
        //imgHeader['Upgrade-Insecure-Requests'] = '1';

        //var imgBody = '__VIEWSTATE'+'='+viewstate+'&'+'__EVENTVALIDATION'+'='+eventvalidation+'&'+btndownall;
/*
        browser.downloads.download({
          url: imgLink,
          filename: boxNo + '.zip',
          saveAs: false,
          method: 'POST',
          headers: [ imgHeader ],
          body: imgBody
        }).then(() => {
          console.info(`downloading ${boxNo}.zip ...`);
        }).error((error) => {
          console.info(`failed to download ${boxNo}.zip: ${error.message}`);
        });
*/
      }
    };

    xhr.open('GET', imgLink);

    //xhr.setRequestHeader('host', window.location.host);
    //xhr.setRequestHeader('Referer', window.location.href);
    xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8');
    xhr.setRequestHeader('Cache-Control', 'max-age=0');
    xhr.setRequestHeader('Upgrade-Insecure-Requests', '1');
    //xhr.setRequestHeader('User-Agent', navigator.userAgent);
    xhr.responseType = "document";

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
        //break;
      }

      console.info(`>>> finish downloading image <<<`);
    } catch (ex) {
      console.error(`${ex}`);
      console.info(`aborting...`);
    }
  }

  function downloadAllPDFs() {
    console.info(`begin download PDF`);

    browser.runtime.sendMessage({
      'arg1': 'aaa',
      'arg2': 'bbb'
    });
  }

  browser.runtime.onMessage.addListener((message) => {
    if (message.command === "img") {
      downloadAllImages();
    } else if (message.command === "pdf") {
      downloadAllPDFs();
    }
  });

})();

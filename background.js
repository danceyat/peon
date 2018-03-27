function handleMsg(message) {
  console.info(`begin background`);

  var imgHeader = {};
  imgHeader['Accept'] = '';
  imgHeader['Content-Type'] = 'application/x-www-form-urlencoded';
  imgHeader['Upgrade-Insecure-Requests'] = '1';

  var imgBody = '__VIEWSTATE'+'='+message.viewstate+'&'+'__EVENTVALIDATION'+'='+message.eventvalidation+'&'+message.btndownall;

  browser.downloads.download({
    url : message.imgLink,
    filename : message.boxNo + '.zip',
    saveAs : false,
    method : 'POST',
    headers : [
      {
      	'name': 'Accept',
      	'value': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      {
      	'name': 'Content-Type',
      	'value': 'application/x-www-form-urlencoded'
      },
      {
      	'name': 'Upgrade-Insecure-Requests',
      	'value': '1'
      }
    ],
    body : imgBody
  }).then(() => {
    console.info(`downloading ${message.boxNo}.zip ...`);
  });

  console.info(`end background`);
}

browser.runtime.onMessage.addListener(handleMsg);
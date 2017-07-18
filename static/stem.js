/**
*  Worker to get possible matches for a stemmed word: e.g. language
*/
onmessage = function(e) {
  var workerResult;
  console.log('Message received from main script');
  //set up the main call for the data to parse. 
  function stemListener () {
    workerResult = JSON.parse(this.responseText);
  }

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "/stem", true);
  oReq.addEventListener("load", stemListener);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send({'word': e.data[0]});

  console.log('Posting message back to main script');
  postMessage(workerResult);
}

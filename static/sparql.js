/**
*  Worker to get possible matches for a stemmed word: e.g. language
*/
onmessage = function(e) {
  var workerResult;
  console.log('Message received from main script');
  //set up the main call for the data to parse. 
  function sparqlListener () {
    workerResult = JSON.parse(this.responseText);
  }

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "/geo", true);
  oReq.addEventListener("load", sparqlListener);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send(JSON.stringify({'term': e.data[0]}));

  console.log('Posting message back to main script');
  postMessage(workerResult);
}

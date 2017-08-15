/**
*  Worker to get possible matches for a list of subjects for a predicate
*/
onmessage = function(e) {
  var workerResult;
  //set up the main call for the data to parse. 
  function stemListener () {
    workerResult = JSON.parse(this.responseText);
    postMessage(workerResult);
  }

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "/subject", true);
  oReq.addEventListener("load", stemListener);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send(JSON.stringify({'subject': e.data[0]}));
}

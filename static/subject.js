/**
*  Worker to get possible matches for a list of subjects for a predicate
*/
onmessage = function(e) {
  var workerResult;
  console.log('Message received from main script');
  //set up the main call for the data to parse. 
  function stemListener () {
    workerResult = JSON.parse(this.responseText);
    postMessage(workerResult);
  }

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "/stem", true);
  oReq.addEventListener("load", stemListener);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send({'subject': e.data[0]});
}

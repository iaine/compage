/**
*  Handle the post back to the server
*/
onmessage = function(e) {
  var workerResult;
  //set up the main call for the data to parse. 
  function postListener () {
    workerResult = JSON.parse(this.responseText);
    postMessage(workerResult);
  }
  var payload = JSON.stringify(e.data)
  var url =  '/worksets/save'; 
  var oReq = new XMLHttpRequest();
  oReq.open("POST", url, true);
  oReq.addEventListener("load", postListener);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send(payload);
}
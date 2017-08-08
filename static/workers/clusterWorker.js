/**
*  Queries the endpoint to return the predicate weightings and ways of thinking about a term
*/
onmessage = function(e) {
  var workerResult;
  //set up the main call for the data to parse. 
  function predListener () {
    workerResult = JSON.parse(this.responseText);
    postMessage(workerResult);
  }
  var url =  '/cluster'; 

  var payload = JSON.stringify({'dataObj': e.data});

  var oReq = new XMLHttpRequest();
  oReq.open("POST", url, true);
  oReq.addEventListener("load", predListener);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send(payload);
}

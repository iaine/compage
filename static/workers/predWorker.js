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
  var payload;
  var url =  '/predicates/similarity'; 
  // if the data is flagged as worket, pass on differently
  if (!e.data[1]) {
    payload = JSON.stringify({'dataObj': [e.data[0]]});
  } else {
    payload = JSON.stringify({'dataObj': e.data[0], 'flag': e.data[1]}); 
  }

  var oReq = new XMLHttpRequest();
  oReq.open("POST", url, true);
  oReq.addEventListener("load", predListener);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send(payload);
}

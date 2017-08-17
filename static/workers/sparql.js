/**
*  Queries the endpoint to return the predicate weightings and ways of thinking about a term
*/
onmessage = function(e) {
  var workerResult;
  //set up the main call for the data to parse. 
  function sparqlListener () {
    workerResult = JSON.parse(this.responseText);
    postMessage(workerResult);
  }
  var payload;
  var url; 
  if (!e.data[1]) {
    url =  '/predicates';
    payload = JSON.stringify({'entity': e.data[0]});
  } else {
    url = '/predicates/workset'; 
    payload = JSON.stringify({'pred': e.data[0], 'ws': e.data[1]}); 
  }
  var oReq = new XMLHttpRequest();
  oReq.open("POST", url, true);
  oReq.addEventListener("load", sparqlListener);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send(payload);
}

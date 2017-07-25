/**
*  Queries the endpoint to return the predicate weightings and ways of thinking about a term
*/
onmessage = function(e) {
  var workerResult;
  console.log('Message received from main script');
  //set up the main call for the data to parse. 
  function sparqlListener () {
    workerResult = JSON.parse(this.responseText);
    postMessage(workerResult);
  }

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "/sparql", true);
  oReq.addEventListener("load", sparqlListener);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send(JSON.stringify({'entity': e.data[0]}));

  /*console.log('Posting message back to main script');
  postMessage(workerResult);*/
}

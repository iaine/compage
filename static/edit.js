/**
*  Worker to get possible matches for a stemmed word: e.g. language
*/
onmessage = function(e) {
  var workerResult;
  console.log('Message received from main script');
  //set up the main call for the data to parse. 
  function editListener () {
    var d = JSON.parse(this.responseText);
    workerResult = e.data[0] + " : " + e.data[1] + " = " + d["result"];
  }

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "/distance", false);
  oReq.addEventListener("load", editListener);
  oReq.setRequestHeader("Content-Type", "application/json");
  data = JSON.stringify({"a": e.data[0], "b": e.data[1]});
  oReq.send(data);
  postMessage(workerResult);
}

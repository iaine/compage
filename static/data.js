/**
*  Worker to get graphs for the chosen items
*/
onmessage = function(e) {
  var workerResult;
  console.log('Message received from main script');
  //set up the main call for the data to parse. 
  function editListener () {
    workerResult = JSON.parse(this.responseText);
    postMessage(workerResult);
  }

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "/data", false);
  oReq.addEventListener("load", editListener);
  oReq.setRequestHeader("Content-Type", "application/json");
  data = JSON.stringify({"data": e.data});
  oReq.send(data);
}

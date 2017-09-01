/**
*  Handle the post back to the server
*/
onmessage = function(e) {
  var workerResult;
  //set up the main call for the data to parse. 
  function postListener () {
    workerResult = JSON.parse(this.responseText);
    postMessage(workerResult['id']);
  }
  var payload = JSON.stringify({"user": e.data[0],"dataObj":e.data[1]});
  console.log(payload);
  var url =  '/worksets/save'; 
  var oReq = new XMLHttpRequest();
  oReq.open("PUT", url, true);
  oReq.addEventListener("load", postListener);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send(payload);
}

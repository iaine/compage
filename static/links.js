/**
*  Worker to get possible matches from linked graphs
*/


onmessage = function(e) {
  console.log('Message received from main script');
  //set up the main call for the data to parse. 
  function semanticListener () {
    var workerResult = JSON.parse(this.responseText);
    postMessage(workerResult);
  }

  var oReq = new XMLHttpRequest();
  oReq.open("POST", "/links", true);
  oReq.addEventListener("load", semanticListener);
  oReq.setRequestHeader("Content-type", "application/json");
  oReq.send(JSON.stringify({'graph': e.data[0]}));
}
//@todo: Refactor this to be cleaner
//wrapper function to parse the JSON into HTML 
function toHtml(data) {
   markup = "";
   markup += parseDifference(data.original, "original");
   markup += parseDifference(data.link, "linked");
   markup += parseDifference(data.difference, "difference");
   //hide similarity for moment
   //markup += simpleMarkup(data.similarity, "similarity");
   markup += createForm(data.original[0][0], data.difference[0][0], "form");
   markup += createObjectLists(data);
   return markup;
}

function parseDifference(difference, divname) {
   html = "<div id='"+divname+"'>";
   difference.map(
        function (x) { html += "<p>" + x[1] + " : " + x[2] + "</p>"; }
   );   
   html += "</div>";
   return html;
}

function simpleMarkup(data, divname) {
  return html = "<div id='"+divname+"'>" + data + "</div>";
}

function createForm(originalUrl, linkedUrl, divname) {
    html = "<div id='" + divname + "'>";
    html += "<div onclick=\"updateWeighting('"+originalUrl+"', '"+linkedUrl+"', 1)\">Agree</div>";
    html += "<div onclick=\"updateWeighting('"+originalUrl+"', '"+linkedUrl+"', 0)\">Disagree</div>";
    html += "</div>";
    return html;
}

var objectSet = new Set();

function createObjectLists(data) {
   listObjects(data);
   html = "<div id=\"objectlist\">";
   objectSet.forEach( function(x) { html += "<div onclick=\"findPredicates('"+ x +"')\">" + x + "</div> ";  } ); 
   html += "</div>";
   return html;  
}

//filter the data to recover all objects
function listObjects(data) {
    parts = [data.original, data.difference, data.link];
    for (d in parts) {
       parts[d].filter(function(x) {objectSet.add(x[2])});
    }
}

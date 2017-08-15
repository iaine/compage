/**
*  Workset object methods.
*  Handles the updating of the object and its markup
*
*/

var workset = function() {
  function init () {
    return new Set();
  }

  /**
  *  Adds an id to the Set of worksets
  */
  function addid(workset, worksetid) {
    workset.add(worksetid);
    return workset;
  }

  /**
  *  Filter a set of ids into a new array
  */
  function filterid(work, worksetid) {
     for (var ids of worksetid) {
         work.delete(ids);
     }
     return work;
  }

  /**
  *  Method to handle the markup for the workset list
  */
  function markup(workids) {
    html = "<div id='workset-id'><h3>Your Worksets</h3><ul>";
    workids.forEach( 
      function(y) { html += "<li>"+ y.value + "<input type=\"button\" class=\"removebutton\" onclick='workset.addToData(\""+y.id+"\")' value=\"Add to Data\"></li>"; }
    );
    html += "</ul></div>";
    return html;
  }

  /**
  * Method to get the details of the data from the workset id
  */
  function addToData(worksetid) {
    var wsResponse;

    function wsListener () {
      wsResponse = JSON.parse(this.responseText);
      wsResponse.forEach(function (d) { 
        ldinjs.createDataObject(d.value,d.id);
      });
      ldinjs.markupSearch();
    } 

    var oReq = new XMLHttpRequest();
    oReq.open("POST", "/worksets/items", true);
    oReq.addEventListener("load", wsListener);
    oReq.setRequestHeader("Content-type", "application/json");
    oReq.send(JSON.stringify({'id': worksetid}));
  }

  return {
      init:init, 
      addid: addid, 
      filterid:filterid, 
      markup: markup, 
      addToData: addToData
  }
}()

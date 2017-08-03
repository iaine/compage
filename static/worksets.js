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
         console.log(ids);
         work.delete(ids);
     }
     return work;
  }

  /**
  *  Method to handle the markup for the workset list
  */
  function markup(workids) {
    html = "<ul>";
    workids.forEach( 
      function(y) { html += "<li id=\""+ y.id+"\">"+ y.value +"</li>"; }
    );
    html += "</ul>";
    return html;
  }

  return {
      init:init, 
      addid: addid, 
      filterid:filterid, 
      markup: markup
  }
}()

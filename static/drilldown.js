/**
*  Methods to suppport data drilling functions
*/

var drillDown;

drillDown = function () {

   function filterIds() {
      var _tmp = Array();
      semdata.filter(function(d) { return _tmp.push(d.id);});
      return _tmp;
  }

  /**
*  Function to create a list per data object of preds : objs
*/
function createDataList(data, div) {
    var markup = '';
    data.forEach(function(x) { markup = markUpList(x, div, markup); });
    return markup;
}

function markUpList(difference, divname, html) {
   html += "<div id='"+divname+"'><ul>";
   html += "<h3>" + difference.value + "</h3>";
   difference.data.forEach(
        function (x) { html += "<li>" + x.p + " : " + x.o + "</li>"; } 
   );
   html += "</ul></div>";
   return html;
}

    //find objects code
  var objectSet = new Set();
  function createObjectLists(data) {
   listObjects(data);
   html = "<div id=\"objectlist\">";
   objectSet.forEach( function(x) { 
       html += "<div>" + x.p 
       + "<input type=\"button\" class=\"removebutton\" onclick='findPredicatesWS(\""+x.p+"\", \""+x.o+"\", \"http://eeboo.oerc.ox.ac.uk/worksets/workset_080e9c11a1b8491e823808e8d9e294f7\")' value=\"Search Workset\">"
       + "<input type=\"button\" class=\"removebutton\" onclick='findPredicates(\""+x.p+"\")' value=\"Search All\">"
       + "</div> ";  
   });
   html += "</div>";
   return html;
  }

  //filter the data to recover all objects
  function listObjects(data) {
    data.forEach( 
       function(d) { d.data.forEach(function(x) { objectSet.add(x);  }); }
    );
  }

    //subjects listing
  function markupSubjects(data) {
    html = "<div id='subjects'><ul>";
    data.map( function(x) { html += '<li onclick="ldinjs.createDataObject(\"'
             + x + '\", \"' + x + '\")">' + x + '</li>'  } );
    html += "</ul></div>";
    return html;
  }


  // show the predicate weightings in a simple list for now
  function markupPredicateWeightings(data) {
    html = "<div id='weightings'>";
    data.map( function(x) { 
        html += "<div onclick=\"associateSubject('"+x.predicate+"')\">" 
                + x.predicate + " : " + x.weight + "%</div>";  
    } );
    html += "</div>";
    return html;
  }

  return {
    filterIds: filterIds,
    createDataLists: createDataLists, 
    createObjectLists: createObjectLists,
    markupSubjects : markupSubjects,
    markupPredicateWeightings : markupPredicateWeightings
  }
}

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

  function filterDates() {
      var _tmp = Array();
      semdata.forEach(function(d) { 
         d.data.forEach(function(y) {
             if (y.p == "http://eeboo.oerc.ox.ac.uk/eeboo/precise-publication") {
                 let pub = parseInt(y.o);
                 _tmp.push({"start": pub, "end": pub += 1, "label": d.value });
             }
        } );  

      });
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

  /**
  *  Method to get the details for the object
  */
  function createSingleDatumList(data, div) {
      let _data = semdata.filter(x => { if (x.id == data) { return x; }});
      datum.innerHTML= markUpList(_data[0], div);
  }

  /**
  *  Find the percentage of objects in data set for a given predicate
  *  and return the object and weighting for data in the cached result set
  */
  function findSimilarityResultSet(pred) {
      let obj = findObjectsByPredicate(pred);
      let objPredSet = new Set(obj);
  }

  function findObjectsByPredicate(pred) {
    let objPred = Array();
    semdata.filter(x => { x.data.filter(y => { if (y.d == pred) { objPred.push(y.o); }}) });
    return objPred;
   }

  function markUpList(difference, divname, html) {

    html += "<div id='"+divname+"'><ul>";
    html += "<h3 id='detail-box'>" + difference.value + "</h3>";
    difference.data.forEach(
        function (x) { html += "<li>" + x.p + " : " + x.o + "</li>"; } 
    );
    html += "<div onclick='drillDown.reset(datum);'>Clear</div></ul></div>";
    return html;
  }

    //find objects code
  var objectSet = new Set();
  function createObjectLists(data) {
   listObjects(data);
   html = "<div id=\"objectlist\">";
   objectSet.forEach( function(x) { 
       html += "<div>" + x 
       + "<input type=\"button\" class=\"removebutton\" onclick='findPredicatesWS(\""+x+"\", [" + convertSettoArray(worksetIds) + "])' value=\"Search Workset\">"
       + "<input type=\"button\" class=\"removebutton\" onclick='findPredicates(\""+x+"\")' value=\"Search All\">"
       + "</div> ";  
   });
   html += "<div onclick='drillDown.reset(objs);'>Clear</div></div>";
   return html;
  }

  function convertSettoArray(setA) {
     let _t = new Array();
     setA.forEach(x => _t.push('"' + x + '"'));
     return _t;
  }

  //filter the data to recover all objects
  function listObjects(data) {
    data.forEach( 
      function(d) { 
        d.data.forEach(
         function(x) { 
             objectSet.add(x.p);
         });
     });
  }

    //subjects listing
  function markupSubjects(data) {
    html = "<div id='subjects'><ul>";
    data.map(function(x) { 
      html += "<li onclick=\"ldinjs.createDataObject('"
             + x.value + "', '" + x.id + "')\">" + x.value + '</li>'});
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

  function reset(divname) {
    divname.innerHTML = "";
  }

  return {
    filterIds: filterIds,
    filterDates: filterDates,
    findSimilarityResultSet: findSimilarityResultSet,
    createDataList: createDataList, 
    createSingleDatumList: createSingleDatumList,
    createObjectLists: createObjectLists,
    markupSubjects : markupSubjects,
    markupPredicateWeightings : markupPredicateWeightings, 
    reset: reset
  }
}

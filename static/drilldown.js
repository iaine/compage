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

  function markUpList(difference, divname, html) {

    html += "<div id='"+divname+"'><ul>";
    html += "<h3 id='detail-box'>" + difference.value + "</h3>";
    difference.data.forEach(
        function (x) { html += "<li>" + x.p + " : <strong>" + x.o + "</strong></li>"; } 
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
       + "<input type=\"button\" class=\"removebutton\" onclick='drillDown.findSimilarityResultSet(\""+x+"\")' value=\"Search Results\">"
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

   /**
   * Function to find the predicates in the existing result set
   * and add the object to the set
   */
   function findSimilarityResultSet(predicate) {
       RSsimilar = new Array();
       semdata.forEach(
           x => { x.data.forEach( y => {
              if (y.p == predicate) { RSsimilar.push(y.o); }
           });
       });

       rset = new Set(RSsimilar);
       weightings = new Array(); //can't have duplicates in the list
       rset.forEach( l => { 
         _tmp = Array();
         RSsimilar.forEach( o => { if(o == l) {_tmp.push(o); }  });
         let countObj = _tmp.length / RSsimilar.length; 
         weightings.push({ "predicate": l, "weight": sims.roundNumber(countObj), "count": RSsimilar.length});     
       } );
       sparql.innerHTML = this.markupPredicateWeightings(weightings);
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
    console.log(data);
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
    findSimilarityResultSet: findSimilarityResultSet,
    markupSubjects : markupSubjects,
    markupPredicateWeightings : markupPredicateWeightings, 
    reset: reset
  }
}

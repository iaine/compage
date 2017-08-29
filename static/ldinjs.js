/**
*  Singleton to hold Linked Data data in browser
*/

var ldinjs = function () {
  
  function init() {
    return new Array();
  }

  /**
  *  Method to remove an entity based on the id
  *  @param{string} entity
  */
  function remove(entity) {
    semdata = semdata.filter( function(en) { return en.id != entity; });
    this.markupSearch();
  }

  /**
  *  Method to add an entity to the JSON object
  */
  function createDataObject(name, id) {
     let _exist = semdata.filter( x => { if (x.id == id ) { return x; }});
     if (0 == _exist.length) {
       semdata.push({'id': id, 'value': name, 'data': new Set(), 'similarity': new Array() });
     }
     this.markupSearch();
  }

  /**
  *  Method of pushing many entities into the data object
  *  @param{array} data
  */
  function pushData (data) {
     data.forEach( function(d) { addDataToObject(d[0],d[1],d[2]);  } );
  }

  /**
  *  Method to update an entity in the object with data
  *  @param{string} entity
  *  @param{string} pred
  *  @param{string} obj
  */
  function addDataToObject(entity, pred, obj) {
      semdata.filter( 
         function (d) { if (d.id == entity) {
            //check for existence of data in entity.data 
            var _tmp = checkDataExistence(d.data, pred, obj);
            if (_tmp.size == 0) {
                d.data.add({'p' : pred, 'o': obj });
            } /*else {
                d.data.add({'p' : pred, 'o': obj });
            }*/
         } 
      });
  }

  /**
  * Method to check for the existence of (pred, obj) pair in data
  * The full pair must match to be equal or we may have a different meaning
  */
  function checkDataExistence(dataObj, prede, obje) {
      var inObj = new Set()
      for (var y of dataObj) {
          if (y.p === prede && y.o === obje) { 
            inObj.add(y) 
          } 
      };
      return inObj;
  }

  /**
  *   Method to add similarity to data object
  */
  function addSimilaritytoObject(similarities) {
    semdata.map(
      function (x) {
          similarities.filter( function(y) {
            if (y.name == x.id) {
              x.similarity.push(y.stats);
            }
          }); 
      }
    );
    this.markupSearch();
  }
  /**
  * Method to markup the data to be searched box
  */
  function markupSearch() {
      var _html = '';
      semdata.forEach( function(message) { _html += '<div id="data-title">' + message.value + 
         "<input type=\"button\" class=\"removebutton\" onclick='ldinjs.remove(\""+
          message.id+"\")' value=\"Remove\">";
          if (0 < message.data.size ) {
           _html += "<input type=\"button\" class=\"removebutton\" onclick='drillDown.createSingleDatumList(\""+
          message.id+"\", \"id-data\")' value=\"Show Details\">";
          }
          if (0 < message.similarity.length ) {
              _html += "<input type=\"button\" class=\"removebutton\" onclick='sims.markUpSimilarity(\""+
                 message.id+"\")' value=\"Show Similar\">";
          }
          _html += '</div>';
      });
      $( "#results" ).html(_html).prependTo( "#results" );
      $( "#results" ).scrollTop( 0 );
  }

  return {
    init: init, 
    remove:remove, 
    createDataObject: createDataObject,
    pushData: pushData, 
    addDataToObject: addDataToObject, 
    addSimilaritytoObject: addSimilaritytoObject,
    checkDataExistence: checkDataExistence,
    markupSearch: markupSearch
  }

}()

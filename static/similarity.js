/**
* Module to encapsulate the similarity algorithms and mark up
*/

var setOperations = function() {

  /**
  *  Method to provide the set union of a list of sets
  */
  function calculateSetUnion(listOfSets) {
      var _tmp = new Set();
      listOfSets.forEach( function(y) {
          for (var i of y) {
             _tmp.add(i);
          }
      });
      return _tmp;
    }

  /**
  *  Method to work out the intersection between two sets. 
  */
  function  calculateSetIntersect(setA, setB) {
      let _tmp = new Set();
      for (var i of setB) {
        setA.forEach( x => { if (x.p == i.p && x.o == i.o) { _tmp.add(i); } });
      }
      return _tmp;
    }

    /**
    *  Method to get the set difference between set a and set b
    *  Return s a new set of the differences. 
    *  setA is the set returned from the intersection. 
    *
    */
    function calculateSetDifference(setA, setB) {
      let _t = new Set();
      for (var i of setB) {
        if (!setA.has(i)) {
           _t.add(i);
        }
      }
      return _t;
    }
  
   /**
   *  Method to calculate the Jaccard similarity
   */
   function jaccardSimilarity(setA, setB) {
     var intersect = this.calculateSetIntersect(setA, setB);
     var union = this.calculateSetUnion([setA, setB]);  
     return parseFloat(intersect.size / union.size);
   }

   /**
   * Method to show the similarities between two entities
   */
   function findSimilarity (entityA, entityB) {
      let set_A = _getData(entityA);
      let set_B = _getData(entityB);
      let t = this.calculateSetIntersect(set_A, set_B);
      clus.innerHTML = markUpEntityChanges(_findTitleBox(set_A), 
             _findTitleBox(set_B), t,
             this.calculateSetDifference(t, set_B));
   }

   /**
   *  Method to extract the data object and ensure its a Set
   */
   function _getData(entity) {
      var _data;
      semdata.filter( function (y) {
       if (y.id == entity) {
           _data = new Set(y.data);
       }
    });
    return _data;
   }
   
   /**
   *  Method to compare the similarity for sorting in ascending order
   */
   function comparator(a, b) {
       return parseFloat(b[2]) - parseFloat(a[2]);
   }

   function sortSimilarities(dobj) {
      return dobj.sort(comparator);
   }

   /**
   *  Public method to get the head and tail of the similarities
   */
   function findHeadTail(dobj) {
      let _headTail = Array();
      _headTail = sortSimilarities(dobj);
      return _headTail.slice(0, 15).concat(_headTail.slice(-15));
   }
   
   /**
   *  Method to create a mark up for the aggregations
   */
   function markUpAggregations(data) {
     html = '<ul id="aggregates">';
     data.forEach(
         function (d) { html += '<li>' + d.id + ' | ' + d.value + '</li>';  }
     );
     return html += '</ul></div>';
   }

   /**
   *  Rounding function for readability
   *  Assumes the num is a floating point with decimal places. 
   */
   function roundNumber(num) {
     return (num * 100).toFixed(3);
   }

   /**
   *  Called from the markup to show the similarities between an item 
   *  and other items in the result set. 
   */
   function markUpSimilarity(entityid) {
     html = '<ul>';
     semdata.filter(
       function(d) {
         if (d.id == entityid) {
           let similarityList = findHeadTail(d.similarity[0]);
           similarityList.forEach( b => {
             html += "<li onclick='sims.findSimilarity(\""+ b[0] +"\", \""+ b[1]+"\")'>"
             + _findTitle(b[1]) + ':<strong>' + roundNumber(b[2]) +  '</strong></li>';
           });
         }
     });
     html += '</ul></div>';
     clus.innerHTML = html; 
   }

   function markUpEntityChanges(titleA, titleB, set_union, set_difference) {
     _html = '<div id="entitysimilarities">';
     _html += '<div id="sim"><h3>' + titleA +'</h3><br /><h3>Similarity</h3><ul>';
     set_union.forEach( function(d) {  _html += "<li>" + d.p + ' : ' + d.o + '</li>'; });
     _html += '</div></ul><div id="diff"><h3>' + titleB +'</h3><br /><h3>Difference</h3><ul>'
     set_difference.forEach( function(d) { _html += '<li>' + d.p + ' : ' + d.o + '</li>'; });
     return _html += '<div id="reset" onclick="drillDown.reset(clus)">Clear</div></ul></div></div>';
   }

   /**
   *  Method to get the title for the similarity box
   */
   function _findTitleBox(dataset) {
     let _title = '';
     dataset.forEach(x => { if (x.p == 'http://www.w3.org/2000/01/rdf-schema#label') { _title = x.o;} 
     });
     return _title;
   }

   /**
   * Method to get the titles for the id.
   */
   function _findTitle (entity) {
      var _tmp = semdata.filter( function(d) { 
            if (d.id == entity) { return d.value; } 
      });
      return _tmp[0].value;
   }

   return {
     roundNumber: roundNumber,
     calculateSetUnion: calculateSetUnion,
     calculateSetIntersect: calculateSetIntersect,
     calculateSetDifference: calculateSetDifference,
     jaccardSimilarity: jaccardSimilarity, 
     findSimilarity: findSimilarity,
     markUpAggregations: markUpAggregations, 
     markUpSimilarity: markUpSimilarity
   }
}


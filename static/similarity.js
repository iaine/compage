/**
* Module to encapsulate the similarity algorithm
*/
var setOperations;

setOperations = {

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
      var _tmp = new Set();
      //check if x is in Array y
      for (var i of setB) {
          if(setA.has(i)) {
            _tmp.add(i);
          }
      }
      return _tmp;
    }

    /**
    *  Method to get the set difference between set x and set y
    *
    */
    function calculateSetDifference(setA, setB) {
      var _tmp = new Set();
      for (var i of setB) {
          if(!setA.has(i)) {
              _tmp.add(i);
          }
      }
      return _tmp;
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
   *  Method to create a mark up for the aggregations
   */
   function markUpAggregations(data) {
     html = '<ul id="aggregates">';
     data.forEach(
         function (d) { html += '<li>' + d.id + ' | ' + d.value + '</li>';  }
     );
     return html += '</ul></div>';
   }

   return {
     calculateSetUnion: calculateSetUnion,
     calculateSetIntersect: calculateSetIntersect,
     calculateSetDifference: calculateSetDifference,
     jaccardSimilarity: jaccardSimilarity, 
     markUpAggregations: markUpAggregations
   }
}


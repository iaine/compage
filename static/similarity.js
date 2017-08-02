/**
* Module to encapsulate the similarity algorithm
*/
var setOperations;

setOperations = {

  /**
  *  Method to provide the set union of a list of sets
  */
  calculateSetUnion: function(listOfSets) {
      var _tmp = new Set();
      listOfSets.forEach( function(y) {
          for (var i of y) {
             _tmp.add(i);
          }
      });
      return _tmp;
    },

  /**
  *  Method to work out the intersection between two sets. 
  */
  calculateSetIntersect: function(setA, setB) {
      var _tmp = new Set();
      //check if x is in Array y
      for (var i of setB) {
          if(setA.has(i)) {
            _tmp.add(i);
          }
      }
      return _tmp;
    },

    /**
    *  Method to get the set difference between set x and set y
    *
    */
  calculateSetDifference: function(setA, setB) {
      var _tmp = new Set();
      for (var i of setB) {
          if(!setA.has(i)) {
              _tmp.add(i);
          }
      }
      return _tmp;
    },
  
   /**
   *  Method to calculate the Jaccard similarity
   */
   jaccardSimilarity: function(setA, setB) {
     var intersect = this.calculateSetIntersect(setA, setB);
     var union = this.calculateSetUnion([setA, setB]);  
     return parseFloat(intersect.size / union.size);
   }
}

module.exports = setOperations;


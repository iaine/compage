/**
* Class to encapsulate the similarity algorithm
*/

class Similarity {
  //flooding algorithms
  similarity = Array()
  compare(dataObject) {
     //calculate the similarity scores for each object in the LD object
     existingQuery = set();
     dataObject.forEach(function(d)  {
         //add to existing query
         existingQuery.add(d.id);
         dataObject.forEach( function(d1)  {
             //don't search searched objects
             if (d1.id != d.id) {
                 if (d1.length > d.length) {
                     d1.data.forEach( compareObjects(x, d.data);)
                 }
             }
         });
     }
  }

  compareObjects(x, y) {
    //check if x is in Array y
    return y.filter(return (y.p == x.p && y.o == x.o) ? 1 : 0;);
  }
}

/**
*  Workset object methods
*/

var workset = {
  workset = new Set();

  /**
  *  Adds an id to the Set of worksets
  */
  addid: function(worksetid) {
    workset.add(worksetid);
  }

  /**
  *  Filter a set of ids into a new array
  */
  filterid: function(work, worksetid) {
     var _tmp = new Set();
     for (var ids of worksetid) {
         _tmp.add(ids);
     }
     return _tmp;
  }
}

module.exports = workset;

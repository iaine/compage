/**
*  Workset object methods
*/

var workset = {
  init: function () {
    return new Set();
  },

  /**
  *  Adds an id to the Set of worksets
  */
  addid: function(workset, worksetid) {
    var _tmp = new Set(workset);
    _tmp.add(worksetid);
    return _tmp;
  },

  /**
  *  Filter a set of ids into a new array
  */
  filterid: function(work, worksetid) {
     for (var ids of worksetid) {
         console.log(ids);
         work.add(ids);
     }
     return work;
  }
}

module.exports = workset;

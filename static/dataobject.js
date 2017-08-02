/**
* Module to encapsulate the similarity algorithm
*/
var dataObject;

dataObject = {

  /**
  *  Method to add an entity to the JSON object
  */
  createDataObject: function(semdata, name, id) {
     semdata.push({'id': id, 'value': name, 'data': new Set() });
  },

  /**
  *  Method of pushing many entities into the data object
  *  @param{array} data
  */
  pushData: function(semdata, data) {
     data.forEach( function(d) { addDataToObject(d[0],d[1],d[2]);  } );
  },

  /**
  *  Method to update an entity in the object with data
  *  @param{string} entity
  *  @param{string} pred
  *  @param{string} obj
  */
  addDataToObject: function(entity, pred, obj) {
      semdata.filter( 
         function (d) { if (d.id == entity) {
            //check for existence of data in entity.data 
            var _tmp = this.checkDataExistence(d.data, pred, obj);
            if (_tmp.size > 0) {
                d.data.add({'p' : pred, 'o': obj });
            } else {
                d.data.add({'p' : pred, 'o': obj });
            }
         } 
      });
  },

  /**
  * Method to check for the existence of (pred, obj) pair in data
  *
  */
  checkDataExistence: function(dataObj, pred, obj) {
      var inObj = new Set();
      for (var i of dataObj) { 
        if (i.p === pred && i.o === obj) {
          inObj.add({'p':pred, 'o': obj});
        }
      }
      return inObj;
  }
}

module.exports = dataObject;

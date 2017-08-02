/**
*  Tests for the Data Object functions
*/

'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;

describe('dataObject', function() {
    it('should exist', function() {
      var dObject = require('../dataobject.js');
      expect(dObject).to.not.be.undefined;
    });
  });

describe('check existence', function() {
    it('should exist', function() {
      var dataObject = require('../dataobject.js');
      var _dobj = new Set([{'p':'http://eeboo/Person','o': 'version'}]);
      var tmp = dataObject.checkDataExistence(_dobj, 'http://eeboo/Person', 'version');
      assert.equal(tmp.size, 1, 'check for data existence');
    });
  });

describe('check existence', function() {
    it('should not exist', function() {
      var dataObject = require('../dataobject.js');
      var _dobj = new Set([{'p':'http://eeboo/Person','o': 'vers'}]);
      var tmp = dataObject.checkDataExistence(_dobj, 'http://eeboo/Person', 'version');
      assert.equal(tmp.size, 0, 'check for non data existence');
    });
  });

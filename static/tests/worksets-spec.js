/**
*  Tests for the Worksets functions
*/

'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;

describe('worksets', function() {
    it('should exist', function() {
      var worksets = require('../worksets.js');
      expect(worksets).to.not.be.undefined;
    });
  });

describe('worksetsAdd', function() {
    it('not be null', function() {
      var worksets = require('../worksets.js');
      var workset = new Set();
      worksets.addid(workset, "workset440022");
      assert.equal(workset.size, 1, 'Should not be null');
    });
  });

describe('worksets filter', function() {
    it('be one when one id removed', function() {
      var worksets = require('../worksets.js');
      var workset = new Set();
      worksets.addid(workset, "workset440022");
      worksets.addid(workset, "workset87654");
      worksets.filterid(workset, ["workset440022"]);
      assert.equal(workset.size, 1, 'Should not be null');
    });
  });

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

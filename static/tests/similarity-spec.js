/**
*  Tests for the similarity functions
*/

'use strict';

var expect = require('chai').expect;
var assert = require('chai').assert;

describe('setOperations', function() {
    it('should exist', function() {
      var setOperations = require('../similarity.js');
      expect(setOperations).to.not.be.undefined;
    });
  });

describe('setDifference', function() {
    it('should have one', function() {
      var setOperations = require('../similarity.js');
      var setA = new Set([1,2,4]);
      var setB = new Set([1,2,3]);
      var tmp = setOperations.calculateSetDifference(setA, setB);
      assert.equal(tmp.size, '1', 'Difference set size');
    });
  });

describe('setIntersection', function() {
    it('should have two', function() {
      var setOperations = require('../similarity.js');
      var setA = new Set([1,2,4]);
      var setB = new Set([1,2,3]);
      var tmp = setOperations.calculateSetIntersect(setA, setB);
      assert.equal(tmp.size, 2, 'Intersection set size');
    });
  });

describe('setUnion', function() {
    it('should have four members', function() {
      var setOperations = require('../similarity.js');
      var setA = new Set([1,2,4]);
      var setB = new Set([1,2,3]);
      var tmp = setOperations.calculateSetUnion([setA, setB]);
      assert.equal(tmp.size, 4, 'Union set size');
    });
  });

describe('jaccardSimilarity', function() {
    it('should be a number', function() {
      var setOperations = require('../similarity.js');
      var setA = new Set([1,2,4]);
      var setB = new Set([1,2,3]);
      var tmp = setOperations.jaccardSimilarity(setA, setB);
      assert.isNotNaN(tmp, 'Similarity percentage');
    });
    it('should be a 0.5', function() {
      var setOperations = require('../similarity.js');
      var setA = new Set([1,2,4]);
      var setB = new Set([1,2,3]);
      var tmp = setOperations.jaccardSimilarity(setA, setB);
      assert.equal(tmp, 0.5, 'Similarity percentage');
    });
  });

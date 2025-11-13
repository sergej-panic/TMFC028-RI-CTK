'use strict';

var url = require('url');

var Resource = require('../service/ResourceService');

module.exports.createResource = function createResource (req, res, next) {
  Resource.createResource(req, res, next);
};

module.exports.deleteResource = function deleteResource (req, res, next) {
  Resource.deleteResource(req, res, next);
};

module.exports.listResource = function listResource (req, res, next) {
  Resource.listResource(req, res, next);
};

module.exports.patchResource = function patchResource (req, res, next) {
  Resource.patchResource(req, res, next);
};

module.exports.retrieveResource = function retrieveResource (req, res, next) {
  Resource.retrieveResource(req, res, next);
};

'use strict';

var path = require('path'),
  mongoose = require('mongoose'),
  Project = require('mongoose').model('Project'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));
exports.create = function(req, res, next) {
  var project = new Project(req.body);
  project.save(function (err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(project);
    }
  });
};

exports.list = function(req, res) {
  Project.find({}, function(err, data) {
    if (err) {
      res.status(400).send(err);
    }
    else {
      res.json(data);
    }
  });
};

exports.delete = function(req, res, next) {
  req.project.remove(function(err) {
    if (err) {
      return next(err);
    }
    else {
      res.json(req.project);
    }
  });
};

exports.read = function(req, res) {
  res.json(req.project);
};

exports.projectById = function(req, res, next, id) {
  Project.findOne({
    _id: id
  },
  function(err, project) {
    if (err) {
      return next(err);
    }
    else {
      req.project = project;
      next();
    }
  }
  );
};
exports.update = function (req, res) {
  req.project.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(req.project);
    }
  });
};
exports.category = function (req, res) {
  var project = req.project;

  // project.title = req.body.title;
  // project.details = req.body.details;
  project.category = req.body.category;

  project.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(project);
    }
  });

};
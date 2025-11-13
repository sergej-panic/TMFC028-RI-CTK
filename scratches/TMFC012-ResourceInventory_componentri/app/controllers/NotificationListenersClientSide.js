'use strict';

var url = require('url');

var NotificationListenersClientSide = require('../service/NotificationListenersClientSideService');

module.exports.listenToResourceAttributeValueChangeEvent = function listenToResourceAttributeValueChangeEvent (req, res, next) {
  NotificationListenersClientSide.listenToResourceAttributeValueChangeEvent(req, res, next);
};

module.exports.listenToResourceCreateEvent = function listenToResourceCreateEvent (req, res, next) {
  NotificationListenersClientSide.listenToResourceCreateEvent(req, res, next);
};

module.exports.listenToResourceDeleteEvent = function listenToResourceDeleteEvent (req, res, next) {
  NotificationListenersClientSide.listenToResourceDeleteEvent(req, res, next);
};

module.exports.listenToResourceStateChangeEvent = function listenToResourceStateChangeEvent (req, res, next) {
  NotificationListenersClientSide.listenToResourceStateChangeEvent(req, res, next);
};

'use strict';
define([
    'underscore',
    'jquery',
    'backbone',
    './user',
    'settings'
], function (_, $, Backbone, User, Settings) {
    return Backbone.Model.extend( {
        defaults: {
            users: new Set()
        }
    });
});
'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    './baseView',
    'tmpl/game'
], function(
    $,
    _,
    Backbone,
    Settings,
    BaseView,
    tmpl
){
    var Game = BaseView.extend({
        template: tmpl,

        show: function () {
            this.prototype.show.call(this);
            this.trigger("startGame", this);
        }
    });
    return new Game();
});

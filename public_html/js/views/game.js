'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi',
    './baseView',
    'tmpl/game',
    'engine/loader-compiled'
], function(
    $,
    _,
    Backbone,
    Settings,
    pixi,
    BaseView,
    tmpl,
    Loader
){
    var Game = BaseView.extend({
        template: tmpl,

        defaults:{
            'renderer': "null",
            'domID': "game_window"
        },

        initialize: function(){
            BaseView.prototype.initialize.call(this);
            this.domID = this.defaults.domID;

        },

        show: function () {
            BaseView.prototype.show.call(this);
            $("#page__site-header").addClass("topped");
        },

        hide: function() {
            BaseView.prototype.hide.call(this);
            $("#page__site-header").removeClass("topped");
        },

        render: function () {
            BaseView.prototype.render.call(this);
            this.loader = new Loader(this.el, this.domID);
        }

    });
    return new Game();
});

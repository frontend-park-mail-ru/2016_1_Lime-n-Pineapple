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
            this.domID = this.defaults.domID
            this.loader = new Loader();
        },

        show: function () {
            BaseView.prototype.show.call(this);
            let self = this;
            this.intervalID = setInterval(function() {
                self.animate(self);
            }, 100);
            $("#page__site-header").addClass("topped");
        },

        hide: function() {
            BaseView.prototype.hide.call(this);
            clearInterval(this.intervalID);
            $("#page__site-header").removeClass("topped");
        },

        //resize: function(self){
        //    self.setContainerPosition();
        //},


        render: function () {
            BaseView.prototype.render.call(this);
            this.renderer = pixi.autoDetectRenderer($(this.el).width()/1.2, $(this.el).height(), {transparent: true});
            document.getElementById(this.domID).appendChild(this.renderer.view);
        },


        animate: function (self) {
            console.log("i am here");
            if (!self.containers.container.children.length){
                self.containers = {};
                self.renderer = null;
                self.stage = null;
                self.initialize();
                self.hide();
                self.render();
                self.show();
            }
            self.renderer.render(self.stage);
        }

    });
    return new Game();
});

'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi',
    './baseView',
    'tmpl/game'
], function(
    $,
    _,
    Backbone,
    Settings,
    pixi,
    BaseView,
    tmpl
){
    var Game = BaseView.extend({
        template: tmpl,

        defaults:{
            'renderer': "null",
            'stage': "null"
        },

        initialize: function(){
            BaseView.prototype.initialize.call(this);
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
            this.renderer = pixi.autoDetectRenderer($("#game_window").width()/1.5, $("#game_window").height(), {transparent: true});
            document.getElementById("game_window").appendChild(this.renderer.view);
            this.stage = new pixi.Container();
            var texture = pixi.Texture.fromImage('static/resources/card1.png');
            var container = new pixi.Container();
            this.stage.addChild(container);
            var card = new pixi.Sprite(texture);
            console.log($(window).height());
            let h = $(window).height()/6;
            let w = $(window).width();


            for (var i = 0; i < 5; i++) {
                let card = PIXI.Sprite.fromImage('static/resources/card1.png');
                card.interactive = true;
                card.buttonMode = true;
                card
                    // events for drag start
                    .on('mousedown', this.onDragStart)
                    .on('touchstart', this.onDragStart)
                    // events for drag end
                    .on('mouseup', this.onDragEnd)
                    .on('mouseupoutside', this.onDragEnd)
                    .on('touchend', this.onDragEnd)
                    .on('touchendoutside', this.onDragEnd)
                    // events for drag move
                    .on('mousemove', this.onDragMove)
                    .on('touchmove', this.onDragMove);
                card.width = h - h/6;
                card.height = h;
                card.x = card.width * i + 2;
                card.anchor.set(0.5);
                container.addChild(card);
            }

            container.y = 4 * h + 5;
            var self = this;

            setInterval(function() {
                self.animate(self);
            }, 50);

        },

        animate: function (self) {
            console.log("i am here");
            self.renderer.render(this.stage);
        },

        onDragStart: function(event) {
            this.data = event.data;
            this.alpha = 0.5;
            this.dragging = true;
        },

        onDragEnd: function()
        {
            this.alpha = 1;

            this.dragging = false;

            // set the interaction data to null
            this.data = null;
        },

        onDragMove: function()
        {
            if (this.dragging)
            {
                var newPosition = this.data.getLocalPosition(this.parent);
                this.position.x = newPosition.x;
                this.position.y = newPosition.y;
            }
        }



});
    return new Game();
});

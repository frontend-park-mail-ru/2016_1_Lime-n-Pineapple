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
            'stage': "null",

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
            this.renderer = pixi.autoDetectRenderer($("#game_window").width()/1.2, $("#game_window").height(), {transparent: true});
            document.getElementById("game_window").appendChild(this.renderer.view);
            this.stage = new pixi.Container();
            var container = new pixi.Container();
            var containerInfighting = new pixi.Container();
            var containerDistantFighting = new pixi.Container();

            this.stage.addChild(container);
            this.stage.addChild(containerInfighting);
            this.stage.addChild(containerDistantFighting);

            let h = $(window).height()/6;
            let w = $(window).width();


            for (var i = 0; i < 9; i++) {
                let card = PIXI.Sprite.fromImage('static/resources/card' + (Math.floor(Math.random() * (8 - 1 + 1)) + 1) + '.png');
                card.interactive = true;
                card.buttonMode = true;
                card.width = h - h/6;
                card.height = h;
                card.x = card.width * i + 2 + card.width/2;
                card.y = card.y + card.height/2
                card.anchor.set(0.5);
                card
                    .on('mousedown', function(event) {
                        self.onClickCard(event, container, card)
                    })
                    .on('touchstart', function(event) {
                        self.onClickCard(event, container, card)
                    });


                container.addChild(card);
            }
            container.y = 4 * h + 9;

            containerInfighting
                .on("mousedown", function(event){

                });

            containerInfighting.y = 2 * h + 9;
            containerDistantFighting.y = 3 * h + 9;

            var self = this;
            setInterval(function() {
                self.animate(self);
            }, 100);

        },

        animate: function (self) {
            console.log("i am here");
            self.renderer.render(this.stage);
        },

        onClickCard: function(event, container, card) {
            console.log(event.data.originalEvent.which);
            switch (event.data.originalEvent.which) {
                case 1:
                    if (card.alpha == 0.5){
                        card.alpha = 1;
                        this.infoCard.renderable = false;
                        for (var i = 0; i < container.children.length; i++){
                            container.children[i].interactive = true;
                        }
                    }
                    else {
                        this.infoCard = new pixi.Sprite(card.texture);
                        for (var i = 0; i < container.children.length; i++){
                            container.children[i].interactive = false;
                        }
                        card.interactive = true;
                        card.alpha = 0.5;
                        this.infoCard.width = card.width * 2.5;
                        this.infoCard.height = card.height * 2.5;
                        this.infoCard.anchor.set(0.5);
                        this.infoCard.x = this.renderer.width - this.infoCard.width / 2 - 10;
                        this.infoCard.y = this.infoCard.height / 2;
                        this.infoCard.setParent(this.stage);
                        this.infoCard.renderable = true;
                        this.stage.addChild(this.infoCard);
                    }
                    break;
            }
        },




});
    return new Game();
});

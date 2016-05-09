"use strict";
define([
    'jquery',
    'backbone',
    'pixi',
    './engine',
    './renderer'
], function ($, Backbone, pixi, Engine, Renderer) {
    class Loader {
            constructor(el, domID) {
                this.loader = new pixi.loaders.Loader();

                console.log("[loader.jsx], constructor");

                this.loader.add("cards", '/js/engine/cards.json');
                //for(let i = 1; i < 10; i+=1){
                //    this.loader.add("card" + i, 'static/resources/card' + i + ".png");
                //}
                //this.res = $.parseJSON('[{"name":"card1","url":"static/resources/card1.png","melee":true,"distant":true,"power":4},{"name":"card2","url":"static/resources/card2.png","melee":false,"distant":true,"power":3},{"name":"card3","url":"static/resources/card3.png","melee":true,"distant":false,"power":2}]');
                this.loader.load(function(loader, res){
                    console.log("[loader.jsx], load");
                    this.renderer = new Renderer(el, domID);
                    this.engine = new Engine(res.cards.data);
                }, this);
            }

        }
        return Loader;
    }
);


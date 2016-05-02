"use strict";
define([
    'jquery',
    'backbone',
    'pixi',
    './engine-compiled',
    './renderer-compiled'
], function ($, Backbone, pixi, Engine, Renderer) {
    class Loader {
            constructor(el, domID) {
                this.loader = new pixi.loaders.Loader();

                console.log("[loader.jsx], constructor");

                for(let i = 1; i < 10; i+=1){
                    this.loader.add("card" + i, 'static/resources/card' + i + ".png");
                }

                this.loader.load(function(loader, res){
                    console.log("[loader.jsx], load");
                    this.renderer = new Renderer(el, domID);
                    this.engine = new Engine(res);
                }, this);
            }

        }
        return Loader;
    }
);


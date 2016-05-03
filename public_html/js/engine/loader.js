"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'backbone', 'pixi', './engine', './renderer'], function ($, Backbone, pixi, Engine, Renderer) {
    var Loader = function Loader(el, domID) {
        _classCallCheck(this, Loader);

        this.loader = new pixi.loaders.Loader();

        console.log("[loader.jsx], constructor");

        for (var i = 1; i < 10; i += 1) {
            this.loader.add("card" + i, 'static/resources/card' + i + ".png");
        }

        this.loader.load(function (loader, res) {
            console.log("[loader.jsx], load");
            this.renderer = new Renderer(el, domID);
            this.engine = new Engine(res);
        }, this);
    };

    return Loader;
});

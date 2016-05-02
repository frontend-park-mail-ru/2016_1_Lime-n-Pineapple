"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './engine-compiled', './card_collection-compiled+'], function ($, _, Backbone, Settings, pixi, Engine, CardCollection) {
    var Loader = function Loader() {
        _classCallCheck(this, Loader);

        this.loader = new pixi.loaders.Loader();

        for (var i = 1; i < 10; i += 1) {
            this.loader.add("card" + i, 'static/resources/card' + i + ".png");
        }

        this.loader.load(function (loader, res) {
            this.playerCollectionCard = new CardCollection(res);
            this.enemyCollectionCard = new CardCollection(res);
            this.engine = new Engine(res, this.playerCollectionCard, this.enemyCollectionCard);
        }, this);
    };

    return Loader;
});

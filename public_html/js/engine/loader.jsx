"use strict";
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi',
    './engine-compiled',
    './card_collection-compiled'
], function ($, _, Backbone, Settings, pixi, Engine, CardCollection) {
    class Loader {
            constructor() {
                this.loader = new pixi.loaders.Loader();

                for(let i = 1; i < 10; i+=1){
                    this.loader.add("card" + i, 'static/resources/card' + i + ".png");
                }

                this.loader.load(function(loader, res){
                    this.playerCollectionCard = new CardCollection(res);
                    this.enemyCollectionCard = new CardCollection(res);
                    this.engine = new Engine(res, this.playerCollectionCard, this.enemyCollectionCard);
                }, this);
            }

        }
        return Loader;
    }
);


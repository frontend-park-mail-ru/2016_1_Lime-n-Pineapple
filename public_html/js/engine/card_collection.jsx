"use strict";
define([
        'jquery',
        'underscore',
        'backbone',
        'settings',
        'pixi',
        './card'
], function ($, _, Backbone, Settings, pixi, Card) {
        class CardCollection {

            constructor(loaderRes, oneLineHeight) {
                this.cardCollection = [];
                for (let i = 0; i < 8; i+=1) {
                    this.cardCollection.push(new Card(loaderRes, oneLineHeight));
                }
                return this.cardCollection;
            }


        }
        return CardCollection;
    }
);


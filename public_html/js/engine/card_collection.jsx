"use strict";
define([
        'jquery',
        'underscore',
        'backbone',
        'settings',
        'pixi',
        './card-compiled'
], function ($, _, Backbone, Settings, pixi, Card) {
        class CardCollection {

            constructor(loaderRes, oneLineHeight, width) {
                this.cardCollection = [];
                for (let i = 0; i < 8; i+=1) {
                    this.cardCollection.push(new Card(loaderRes, oneLineHeight, width));
                }
            }


        }
        return CardCollection;
    }
);


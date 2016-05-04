"use strict";
define([
        'jquery',
        'underscore',
        'backbone',
        'settings',
        'pixi',
        './CardModel'
], function ($, _, Backbone, Settings, pixi, Card) {
        class CardCollection {

            constructor(loaderRes, oneLineHeight) {
                this.cardCollection = [];
                _.extend(this.cardCollection, Backbone.Events);

                this.cardCollection.on("SetPositionInDeck", function(containerView){
                   this.setPosition(containerView);
                }, this);

                for (let i = 0; i < 8; i+=1) {
                    this.cardCollection.push(new Card(loaderRes, oneLineHeight));
                }
                return this.cardCollection;
            }

            setPosition(containerView){
                for (let i = 0; i < this.cardCollection.length; i+=1) {
                    this.cardCollection[i].trigger("SetPositionInDeck", i, containerView);
                }

            }


        }
        return CardCollection;
    }
);


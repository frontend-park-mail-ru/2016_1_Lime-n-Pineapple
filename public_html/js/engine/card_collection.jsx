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

            constructor(loaderRes) {
                this.cardCollection = [];
                _.extend(this.cardCollection, Backbone.Events);

                this.cardCollection.on("CardCollection::CreatePlayersDeck", function(containerView){
                   this.setPosition(containerView);
                }, this);

                for (let i = 0; i < 8; i+=1) {
                    this.cardCollection.push(new Card(loaderRes));
                }
                return this.cardCollection;
            }

            setPosition(containerView){
                for (let i = 0; i < this.cardCollection.length; i+=1) {
                    this.cardCollection[i].trigger("CardModel::SetPositionInContainer", i, containerView);
                }

            }


        }
        return CardCollection;
    }
);


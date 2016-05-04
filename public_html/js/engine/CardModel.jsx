"use strict";
define([
    'backbone',
    'underscore',
    'pixi',
    './CardView'
    ],
    function (Backbone, _, pixi, CardView) {
        class Card{
            constructor(loaderRes, oneLineHeight) {
                _.extend(this, Backbone.Events);
                this.cardView = new CardView(loaderRes, oneLineHeight);

                this.on("SetPositionInDeck", function(index, containerView){
                    this.setPositionIntoDeck(index, containerView);
                }, this);

                this.on("SetTouchEventCard", function () {
                    this.setTouchEventCard();
                }, this);
            }

            setPositionIntoDeck(index, containerView){
                this.cardView.trigger("SetPositionInDeck", index, containerView);
            }

            setTouchEventCard(){
                this.cardView.trigger("SetTouchEventCard");
            }
        }
        return Card;
    }
);


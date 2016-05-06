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

                this
                    .on("SetTouchEventCard", function (player) {
                        this.setTouchEventCard();
                        this.playerOwner = player;
                    }, this)
                    .on("CardViewPressed", function(){
                        this.playerOwner.trigger("MustCreateInfoCard", this);
                    }, this)
                    .on("InfoCardBackToDeck", function(){
                        this.playerOwner.trigger("InfoCardBackToDeck", this);
                    }, this);
            }

            setPositionIntoDeck(index, containerView){
                this.cardView.setPositionIntoDeck(index, containerView);
            }

            setTouchEventCard(){
                this.cardView.setTouchEventCard(this);
            }
        }
        return Card;
    }
);


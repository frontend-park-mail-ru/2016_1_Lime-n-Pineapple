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

                this
                    .on("CardModel::SetPositionInDeck", function(index, containerView){
                        this.setPositionIntoDeck(index, containerView);
                    }, this)
                    .on("CardModel::SetTouchEventCard", function (player) {
                        this.setTouchEventCard();
                        this.playerOwner = player;
                    }, this)
                    .on("CardModel::CardViewPressed", function(){
                        this.playerOwner.trigger("AbstractPlayer::MustCreateInfoCard", this);
                    }, this)
                    .on("CardModel::InfoCardBackToDeck", function(){
                        this.playerOwner.trigger("AbstractPlayer::InfoCardBackToDeck", this);
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


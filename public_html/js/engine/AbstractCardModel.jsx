"use strict";
define([
        'backbone',
        'underscore',
        'pixi',
        './CardView',
        './Settings'
    ],
    function (Backbone, _, pixi, CardView, SETTINGS) {
        class Card{
            constructor(loaderRes) {
                _.extend(this, Backbone.Events);
                this.cardView = new CardView(loaderRes);

                this
                    .on("CardModel::SetTouchEventCard", function (player) {
                        this.setTouchEventCard();
                        this.playerOwner = player;
                    }, this)
                    .on("CardModel::CardViewPressed", function(){
                        this.playerOwner.trigger("AbstractPlayer::MustCreateInfoCard", this);
                    }, this)
                    .on("CardModel::InfoCardBackToDeck", function(){
                        this.playerOwner.trigger("AbstractPlayer::InfoCardBackToDeck", this);
                    }, this)
                    .on("CardModel::SetPositionInContainer", function(index, containerView){
                        this.setPositionIntoContainer(index, containerView);
                    }, this);

            }

            setPositionIntoContainer(index, containerView){
                this.cardView.setPositionIntoContainer(index, containerView);
            }

            setTouchEventCard(){
                this.cardView.setTouchEventCard(this);
            }
        }
        return Card;
    }
);


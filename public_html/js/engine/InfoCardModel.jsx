"use strict";
define([
        'backbone',
        'underscore',
        'pixi',
        './InfoCardView'
    ],
    function (Backbone, _, pixi, InfoCardView) {
        class InfoCard{
            constructor(card, playerOwner) {
                this.playerOwner = playerOwner;
                _.extend(this, Backbone.Events);
                this.infoCardView = new InfoCardView(card.cardView.sprite);
                this.on("BackToDeck BackToDeckPrevious", function(card){
                    this.infoCardView.backToDeck(card.cardView);
                }, this);

                this.infoCardView.on("InfoCardInDeck", function(card){
                    console.log("CARD.TRIGGER(ALPHA)");
                    console.log(card);
                    card.trigger("AlphaVisible");
                    this.playerOwner.trigger("MustDestroyInfoCard");
                }, this);

            }
        }
        return InfoCard;
    }
);

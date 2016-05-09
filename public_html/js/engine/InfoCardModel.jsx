"use strict";
define([
        'backbone',
        'underscore',
        'pixi',
        './InfoCardView'
    ],
    function (Backbone, _, pixi, InfoCardView) {
        class InfoCard{
            constructor(card, container, playerOwner) {
                this.playerOwner = playerOwner;
                _.extend(this, Backbone.Events);
                this.infoCardView = new InfoCardView(container, card.cardView.sprite);
                this.on("InfoCardModel::BackToDeck InfoCardModel::BackToDeckPrevious", function(card){
                    this.infoCardView.backToDeck(card.cardView);
                }, this);

                this.infoCardView.on("InfoCardInDeck", function(card){
                    card.trigger("CardView::AlphaVisible");
                    this.playerOwner.trigger("AbstractPlayer::MustDestroyInfoCard");
                }, this);

            }
        }
        return InfoCard;
    }
);

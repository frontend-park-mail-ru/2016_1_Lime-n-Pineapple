"use strict";
define([
        'backbone',
        'underscore',
        'jquery',
        'pixi',
        './InfoCardView',
        './EventsConfig'
    ],
    function (Backbone, _, $, pixi, InfoCardView, Events) {
        class InfoCard{
            constructor(container, playerOwner) {
                this.playerOwner = playerOwner;
                _.extend(this, Backbone.Events);
                this.isHide = true;
                this.infoCardView = new InfoCardView(container, this.playerOwner);

                this
                    .on(Events.Game.InfoCardModel.BackToDeck, function(cardModel){
                        this.infoCardView.backToDeck(cardModel);
                    }, this)
                    .on(Events.Game.InfoCardModel.AddToBattlesContainer, function (cardModel, containerModel) {
                        this.infoCardView.moveToBattleField(cardModel, containerModel, this.playerOwner);
                        playerOwner.trigger(Events.Game.AbstractPlayer.DeleteCardFromCardCollection, cardModel);
                    }, this)

                    .on(Events.Game.InfoCardModel.ShowInfoCard, function (cardModel) {
                        this.isHide = false;
                        this.infoCardView.showInfoCard(cardModel, this);
                    }, this)
                    .on("InfoCardInOwnContainer", function (cardModel) {
                        console.log("InfoCardInOwnContainer");
                        this.playerOwner.trigger(Events.Game.AbstractPlayer.InfoCardInOwnContainer, cardModel);
                    }, this);

                this.infoCardView
                    .on("InfoCardInContainer", function(cardModel){
                        this.isHide = true;
                        this.playerOwner.trigger(Events.Game.AbstractPlayer.InfoCardInContainer);
                        $(cardModel).trigger(Events.Game.AbstractPlayer.PreviousInfoCardInDeck);
                        cardModel.cardView.trigger("CardView::AlphaVisible");
                        cardModel.trigger("CardModel::SetClickEventCard");
                    }, this)
                    .on("InfoCardInBattleContainer", function (cardModel) {
                        this.playerOwner.trigger(Events.Game.AbstractPlayer.InfoCardAddedToBattle);
                        cardModel.cardView.trigger("CardView::AlphaVisible");
                    });

            }
        }
        return InfoCard;
    }
);

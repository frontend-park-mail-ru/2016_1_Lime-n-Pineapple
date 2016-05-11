"use strict";
define([
        'backbone',
        'underscore',
        'jquery',
        'pixi',
        './InfoCardView'
    ],
    function (Backbone, _, $, pixi, InfoCardView) {
        class InfoCard{
            constructor(container, playerOwner) {
                this.playerOwner = playerOwner;
                _.extend(this, Backbone.Events);
                this.isHide = true;
                this.infoCardView = new InfoCardView(container, this.playerOwner);

                this
                    .on("InfoCardModel::BackToDeck", function(cardModel){
                        this.infoCardView.backToDeck(cardModel);
                    }, this)
                    .on("InfoCardModel::AddToBattlesContainer", function (cardModel, containerModel) {
                        this.infoCardView.moveToBattleField(cardModel, containerModel, this.playerOwner);
                        playerOwner.trigger("AbstractPlayer::DeleteCardFromCardCollection", cardModel);
                    }, this)

                    .on("InfoCardModel::ShowInfoCard", function (cardModel) {
                        this.isHide = false;
                        this.infoCardView.showInfoCard(cardModel, this);
                    }, this)
                    .on("InfoCardInOwnContainer", function (cardModel) {
                        console.log("InfoCardInOwnContainer");
                        this.playerOwner.trigger("AbstractPlayer::InfoCardInOwnContainer", cardModel);
                    }, this);

                this.infoCardView
                    .on("InfoCardInContainer", function(cardModel){
                        this.isHide = true;
                        this.playerOwner.trigger("AbstractPlayer::InfoCardInContainer");
                        $(cardModel).trigger("AbstractPlayer::PreviousInfoCardInDeck");
                        cardModel.cardView.trigger("CardView::AlphaVisible");
                        cardModel.trigger("CardModel::SetClickEventCard");
                    }, this)
                    .on("InfoCardInBattleContainer", function (cardModel) {
                        this.playerOwner.trigger("AbstractPlayer::InfoCardAddedToBattle");
                        cardModel.cardView.trigger("CardView::AlphaVisible");
                    });

            }
        }
        return InfoCard;
    }
);

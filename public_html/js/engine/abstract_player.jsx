"use strict";
define([
        'jquery',
        'backbone',
        'pixi',
        './card_collection',
        './InfoCardModel'
],  function ($, Backbone, pixi, CardCollection, InfoCardModel) {

        let oneLineHeight = $(window).height()/6;
        let width = $(window).width();


        class AbstractPlayer {

            constructor(loaderRes, container){
                _.extend(this, Backbone.Events);
                this.cardCollection = new CardCollection(loaderRes, oneLineHeight);
                if (container.playersCardsDeck !== undefined) {
                    this.playersCardsDeck = container.playersCardsDeck;
                }
                this.playersCardContainerMelee = container.playersCardContainerMelee;
                this.playerCardContainerDistant = container.playersCardContainerDistant;

                this
                    .on("AbstractPlayer::Act", function(){
                        this.trigger("Player::PlayerAct");
                    }, this)
                    .on("AbstractPlayer::MustCreateInfoCard", function (card) {
                        if (this.infoCard === undefined) {
                            this.infoCard = new InfoCardModel(card, this);
                            this.infoCard.card = card;
                        }
                        else {
                            this.infoCard.trigger("InfoCardModel::BackToDeckPrevious", this.infoCard.card);
                            this.on("AbstractPlayer::PreviousInfoCardBackToDeck", function () {
                                this.off("AbstractPlayer::PreviousInfoCardBackToDeck");
                                this.trigger("AbstractPlayer::MustCreateInfoCard", card);
                            }, this);

                        }
                    }, this)
                    .on("AbstractPlayer::MustDestroyInfoCard", function(){
                        delete this.infoCard;
                        this.trigger("AbstractPlayer::PreviousInfoCardBackToDeck");
                    }, this)
                    .on("AbstractPlayer::InfoCardBackToDeck", function(card){
                        this.infoCard.trigger("InfoCardModel::BackToDeck", card);
                    }, this);
            }

            act(){
                console.log("[AbstractPlayer] constructor");
            }

            createDeck() {
                console.log("[AbstractPlayer], createDesc");
                if (this.playersCardsDeck !== undefined) {
                    this.playersCardsDeck.trigger("PlayersCardsDeck::CreatePlayersDeck", this.cardCollection);
                }
            }

        }
        return AbstractPlayer;
    }
);


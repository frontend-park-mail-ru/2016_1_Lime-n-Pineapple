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
                    .on("Act", function(){
                        this.trigger("PlayerAct");
                    }, this)
                    .on("MustCreateInfoCard", function (card) {
                        if (this.infoCard === undefined) {
                            this.infoCard = new InfoCardModel(card, this);
                            this.infoCard.card = card;
                        }
                        else {
                            this.infoCard.trigger("BackToDeckPrevious", this.infoCard.card);
                            this.on("PreviousInfoCardBackToDeck", function () {
                                this.off("PreviousInfoCardBackToDeck");
                                this.trigger("MustCreateInfoCard", card);
                            });

                        }
                    }, this)
                    .on("MustDestroyInfoCard", function(){
                        delete this.infoCard;
                        this.trigger("PreviousInfoCardBackToDeck");
                    }, this)
                    .on("InfoCardBackToDeck", function(card){
                        this.infoCard.trigger("BackToDeck", card);
                    }, this);
            }

            act(){
                console.log("[AbstractPlayer] constructor");
            }

            createDeck() {
                console.log("[AbstractPlayer], createDesc");
                if (this.playersCardsDeck !== undefined) {
                    this.playersCardsDeck.trigger("CreatePlayersDeck", this.cardCollection);
                }
            }

        }
        return AbstractPlayer;
    }
);


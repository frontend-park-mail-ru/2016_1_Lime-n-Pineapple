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
                if (container.playersCardDeck !== undefined) {
                    this.playersCardDeck = container.playersCardsDeck;
                }
                this.playersCardContainerMelee = container.playersCardContainerMelee;
                this.playerCardContainerDistant = container.playersCardContainerDistant;
                console.log(this.cardCollection);

                this
                    .on("Act", function(){
                        this.trigger("PlayerAct");
                    }, this)
                    .on("MustCreateInfoCard", function (card) {
                        this.infoCard = new InfoCardModel(card);
                    }, this)
                    .on("MustDestroyInfoCard", function(){
                        delete this.infoCard;
                    }, this);
            }

            act(){
                console.log("[AbstractPlayer] constructor");
            }

            createDeck() {
                console.log("[AbstractPlayer], createDesc");
                if (this.playersCardDeck !== undefined) {
                    this.playersCardDeck.trigger("CreatePlayersDeck", this.cardCollection);
                }
            }

        }
        return AbstractPlayer;
    }
);


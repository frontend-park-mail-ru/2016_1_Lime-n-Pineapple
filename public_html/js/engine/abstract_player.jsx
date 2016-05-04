"use strict";
define([
        'jquery',
        'backbone',
        'pixi',
        './card_collection'
],  function ($, Backbone, pixi, CardCollection) {

        let oneLineHeight = $(window).height()/6;
        let width = $(window).width();


        class AbstractPlayer {

            constructor(loaderRes, container){
                _.extend(this, Backbone.Events);
                this.cardCollection = new CardCollection(loaderRes, oneLineHeight);
                this.playersCardDeck = container.playersCardsDeck;
                this.playersCardContainerInfightng = container.playersCardContainerInfighting;
                this.playerCardContainerDistant = container.playersCardContainerDistant;
                console.log(this.cardCollection);

                this.on("Act", function(){
                    this.trigger("PlayerAct");
                }, this);
            }

            act(){
                console.log("[AbstractPlayer] constructor");
            }

            createDeck() {
                console.log("[AbstractPlayer], createDesc");
                this.playersCardDeck.trigger("CreatePlayersDeck", this.cardCollection);
            }

        }
        return AbstractPlayer;
    }
);


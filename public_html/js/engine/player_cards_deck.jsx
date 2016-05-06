"use strict";
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi',
    './AbstractCardContainerModel'
], function ($, _, Backbone, Settings, pixi, AbstractCardContainerModel) {

    let oneLineHeight = $(window).height() / 6;
    let width = $(window).width();

    class PlayerCardsDeck extends AbstractCardContainerModel{

        constructor(cardContainerView) {
            super(cardContainerView);

            this.on("PlayersCardsDeck::CreatePlayersDeck", function(cardCollection){
                this.cardCollection = cardCollection;
                this.createCardDeck();
            }, this);



        }

        createCardDeck(){
            console.log("[PlayerCardsDeck] createCardDeck");
            this.cardCollection.trigger("CardCollection::CreatePlayersDeck", this.containerView);
        }

    }
    return PlayerCardsDeck;
});
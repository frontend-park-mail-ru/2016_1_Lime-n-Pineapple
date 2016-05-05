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

            this.on("CreatePlayersDeck", function(cardCollection){
                this.cardCollection = cardCollection;
                this.createCardDeck();
            }, this);



        }

        createCardDeck(){
            this.cardCollection.trigger("SetPositionInDeck", this.containerView);
        }

    }
    return PlayerCardsDeck;
});
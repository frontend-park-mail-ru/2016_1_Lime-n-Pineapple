"use strict";
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi',
    './AbstractCardContainerModel'
], function ($, _, Backbone, Settings, pixi, AbstractCardContainerModel) {

    class PlayerCardsDeck extends AbstractCardContainerModel{

        constructor(cardContainerView) {
            super(cardContainerView);

            this
                .on("PlayersCardsDeck::CreatePlayersDeck", function(cardCollection){
                    this.cardCollection = cardCollection;
                    this.createPlayersDeck();
                }, this)
                .on("PlayersCardsDeck::RemoveGapsInDeck", function () {
                    this.containerView.removeGapsInDeck(this.cardCollection);
                }, this)
                .on("PlayersCardsDeck::DeleteCardFromCardCollection", function (card) {
                    this.deleteCardFromCardCollection(card);
                });

            Backbone.on("PlayerCardsDeck::GetDeckWidth", function(getWidth){
                getWidth(this.containerView.containerView.width);
            }, this);
        }

        createPlayersDeck(){
            this.containerView.createPlayersDeck(this.cardCollection);
        }

    }
    return PlayerCardsDeck;
});
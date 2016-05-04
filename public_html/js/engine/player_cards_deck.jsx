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

            //this.container = cardContainerView;
            //this.stage = new pixi.Container();
            //
            //_.forEach(this.containers, function (value, key) {
            //    this.containers[key] = new pixi.Container();
            //    this.stage.addChild(this.containers[key]);
            //}, this);


            //Backbone.on("CardMustAddToContainer", function (actionCard, container) {
            //    actionCard.x = container.children.length * actionCard.width + 2 + actionCard.width / 2;
            //    actionCard.y = actionCard.height / 2;
            //    container.addChild(actionCard);
            //
            //    console.log(container.x, container.y, container.height);
            //    actionCard.alpha = 1;
            //    container.visible = true;
            //    console.log(actionCard.x, actionCard.y);
            //    console.log(container);
            //}, this);


        }

        createCardDeck(){
            this.cardCollection.trigger("SetPositionInDeck", this.containerView);
        }


        //onClickBattleField(event, container, actionCard, infoCard) {
        //    actionCard.mustX = container.children.length * actionCard.width + 2 + actionCard.width / 2;
        //    actionCard.mustY = container.y + actionCard.height / 2;
        //    this.stage.addChild(actionCard);
        //    actionCard.x = infoCard.x;
        //    actionCard.y = infoCard.y;
        //    this.removeGapsInDeck(this.containers.containerPlayer);
        //    Backbone.trigger("CardAreThrown", actionCard, container);
        //    Backbone.trigger("AIprocess");
        //}

    }
    return PlayerCardsDeck;
});
"use strict";
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi'
], function ($, _, Backbone, Settings, pixi) {

    let oneLineHeight = $(window).height() / 6;

    class AbstractCardContainerModel{

        constructor(cardContainerView) {
            _.extend(this, Backbone.Events);

            this.containerView = cardContainerView;
            this.graphics = new pixi.Graphics();

            //this.setContainerPosition();

            this.on("CardPressed", function () {
                this.containerView.on("mousedown", function(){

                }, this);
            }, this);

            this.on("CardAreThrown CardBackIntoDesc", function() {
                this.containerView.off("mousedown");
            }, this);



            this.on("RemoveGapsInDeck", function () {
                this.containerView.trigger("RemoveGapsInContainer");
            }, this);

            this.on("AbstractCardContainer::SetContainerPosition", function(arrContainer, stage){
                AbstractCardContainerModel.setContainerPosition(arrContainer, stage, oneLineHeight);
            });

            this.containerView.containerView.on('mouseover', function(event){
                console.log("mouseoverContainer");
                this.cardWidth = 0;
                this.graphics.visible = true;
                if (!this.graphics.parent) {
                    Backbone.trigger("PlayerCardsDeck::GetCardsWidth", this.getCardsWidth.bind(this));
                    this.containerView.containerView.addChild(this.graphics);
                    this.graphics.beginFill(0xffae80, 0.15);

                    this.graphics.lineStyle(3, 0xff8e4d, 0.3);
                    this.graphics.moveTo(3, 0);
                    this.graphics.lineTo(3, oneLineHeight);
                    this.graphics.lineTo(this.cardWidth * 8 + 14, oneLineHeight);
                    this.graphics.lineTo(this.cardWidth * 8 + 14, 0);
                    this.graphics.lineTo(3, 0);
                }
            }, this);
            this.containerView.containerView.on('mouseout', function(event){
                //this.containerView.containerView.removeChild(this.graphics);
                this.graphics.visible = false;
            }, this);

        }

        getCardsWidth(width){
            this.cardWidth = width;
        }

        // nice work
        static setContainerPosition(arrContainer, stage, oneLineHeight) {
            let i = 4;
            _.forEach(arrContainer, function(value, key){
                stage.addChild(arrContainer[key].containerView.containerView);
                arrContainer[key].containerView.containerView.y = 0;
                arrContainer[key].containerView.containerView.x = 0;
                arrContainer[key].containerView.containerView.y = i * oneLineHeight;
                i-=1;
            });
        }
    }
    return AbstractCardContainerModel;
});
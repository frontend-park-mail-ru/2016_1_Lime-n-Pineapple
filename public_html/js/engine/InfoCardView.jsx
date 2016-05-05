"use strict";
define([
        'backbone',
        'underscore',
        'pixi',
        './CardsScenario'
    ],
    function (Backbone, _, pixi, CardScenario) {
        class InfoCardView extends CardScenario{
            constructor(card) {
                super();
                this.infoCard = new pixi.Sprite(card.texture);
                this.infoCard.width = card.sprite.width * 2;
                this.infoCard.height = card.sprite.height * 2;
                this.infoCard.anchor.set(0.5);
                card.sprite.parent.parent.trigger("AddChildToStage", this.infoCard);
                this.infoCard.x = card.sprite.x;
                this.infoCard.y = card.sprite.parent.y;
                this.infoCard.mustX = card.sprite.parent.parent.width + this.infoCard.width / 2;
                this.infoCard.mustY = this.infoCard.height / 2;
                this.infoCard.deltaX = this.infoCard.mustX - this.infoCard.x;
                this.infoCard.deltaY = this.infoCard.mustY - this.infoCard.y;
                this.infoCard.rateX = this.infoCard.deltaX/10;
                this.infoCard.rateY = this.infoCard.deltaY/10;

                Backbone.trigger("render::renderAnimation", this.moveCard.bind(this), this.infoCard);
                //this.moveCard(this.infoCard);

                //_.extend(this, Backbone.Events);

            }

            //moveCard(card){
            //    card.x+=card.rateX;
            //    card.y+=card.rateY;
            //    if (Math.abs(card.x - card.mustX) < 10 && Math.abs(card.y - card.mustY) < 10){
            //        this.trigger("CardMoved");
            //    }
            //}

        }
        return InfoCardView;
    }
);


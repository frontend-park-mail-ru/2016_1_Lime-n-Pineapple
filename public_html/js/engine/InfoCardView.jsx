"use strict";
define([
        'backbone',
        'underscore',
        'pixi'
    ],
    function (Backbone, _, pixi) {
        class InfoCardView{

            constructor(card) {
                _.extend(this, Backbone.Events);
                let fps = 60, second = 1000, duration = 150;
                this.frames = fps * (duration/second);
                this.infoCard = new pixi.Sprite(card.texture);
                this.infoCard.width = card.width * 2;
                this.infoCard.height = card.height * 2;
                this.infoCard.anchor.set(0.5);
                card.parent.parent.trigger("AddChildToStage", this.infoCard);
                this.infoCard.x = card.x;
                this.infoCard.y = card.parent.y;
                //this.infoCard.mustX = card.parent.parent.parent.width - this.infoCard.width / 2;
                this.infoCard.mustX = card.width * 9 + 10;
                this.infoCard.mustY = this.infoCard.height / 2;
                this.calcDeltaAndRate();
                Backbone.trigger("render::renderAnimation", this.moveCard.bind(this), this.frames);
            }

            moveCard(){
                this.infoCard.x+=this.infoCard.rateX;
                this.infoCard.y+=this.infoCard.rateY;
                if (Math.abs(this.infoCard.x - this.infoCard.mustX) < 10 && Math.abs(this.infoCard.y - this.infoCard.mustY) < 10){
                    this.trigger("CardOnPosition");
                }
            }

            calcDeltaAndRate(){
                this.infoCard.deltaX = this.infoCard.mustX - this.infoCard.x;
                this.infoCard.deltaY = this.infoCard.mustY - this.infoCard.y;
                this.infoCard.rateX = this.infoCard.deltaX/this.frames;
                this.infoCard.rateY = this.infoCard.deltaY/this.frames;
                this.goToBack = true;
            }


            backToDeck(card){
                if (this.goToBack) {
                    console.log("INFOCARDVIEW backToDeck");
                    this.infoCard.width = card.sprite.width;
                    this.infoCard.height = card.sprite.height;
                    this.infoCard.mustX = card.sprite.x;
                    this.infoCard.mustY = card.sprite.parent.y;
                    this.calcDeltaAndRate();
                    this.goToBack = false;
                    Backbone.trigger("render::renderAnimation", this.moveCard.bind(this), this.frames);
                }
                this.on("CardOnPosition", function(){
                    if (this.infoCard.parent){
                        this.infoCard.parent.removeChild(this.infoCard);
                        this.trigger("InfoCardInDeck", card);
                        this.off("CardOnPosition");
                        this.goToBack = true;
                    }
                }, this);
            }

        }
        return InfoCardView;
    }
);


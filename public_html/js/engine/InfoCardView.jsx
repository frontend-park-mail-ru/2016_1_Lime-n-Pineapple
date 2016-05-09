"use strict";
define([
        'backbone',
        'underscore',
        'jquery',
        'pixi',
        './Settings'
    ],
    function (Backbone, _, $, pixi, SETTING) {
        class InfoCardView{

            constructor(container, card) {
                _.extend(this, Backbone.Events);
                let fps = 60, second = 1000, duration = 150;
                this.frames = fps * (duration/second);
                this.infoCard = new pixi.Sprite(card.texture);
                this.infoCard.width = card.width * 2;
                this.infoCard.height = card.height * 2;
                this.infoCard.anchor.set(0.5);
                Backbone.trigger("AddChildToStage", this.infoCard);
                this.container = container;
                let cardX = card.x, cardY= card.y;
                while(card.parent.parent !== undefined) {
                    this.infoCard.x += card.parent.x;
                    this.infoCard.y += card.parent.y;
                    card = card.parent;
                }
                this.infoCard.x += cardX;
                this.infoCard.y += cardY;
                this.infoCard.mustX = container.containerView.x;
                this.infoCard.mustY = container.containerView.y;
                this.calcDeltaAndRate();
                Backbone.trigger("render::renderAnimation", this.moveCard.bind(this), this.frames);
            }

            moveCard(){
                this.infoCard.x+=this.infoCard.rateX;
                this.infoCard.y+=this.infoCard.rateY;
                if (Math.abs(this.infoCard.x - this.infoCard.mustX) < 10 && Math.abs(this.infoCard.y - this.infoCard.mustY) < 10){
                    if (!this.goToBack) {
                        $(this).trigger("CardOnPosition");
                    }
                    else {
                        this.container.trigger("AbstractCardContainerModel::AddChild", this.container.containerView,
                        this.container.containerView.width/2, this.container.containerView.height/2);
                    }
                    this.zeroMustPosition();
                }
            }

            zeroMustPosition(){
                this.infoCard.mustX = 0;
                this.infoCard.mustY = 0;
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
                    this.zeroMustPosition();
                    console.log("INFOCARDVIEW backToDeck");
                    this.infoCard.width = card.sprite.width;
                    this.infoCard.height = card.sprite.height;
                    let par = card.sprite;

                    while(par.parent.parent){
                        this.infoCard.mustX += par.parent.x;
                        this.infoCard.mustY += par.parent.y;
                        par = par.parent;
                    }
                    this.infoCard.mustX +=  card.sprite.x;
                    this.infoCard.mustY += card.sprite.y;
                    this.calcDeltaAndRate();
                    this.goToBack = false;
                    Backbone.trigger("render::renderAnimation", this.moveCard.bind(this), this.frames);
                }
                $(this).one("CardOnPosition", function (event) {
                    if (this.infoCard.parent){
                        this.infoCard.parent.removeChild(this.infoCard);
                        this.trigger("InfoCardInDeck", card);
                        this.goToBack = true;
                    }
                }.bind(this));
            }
        }
        return InfoCardView;
    }
);


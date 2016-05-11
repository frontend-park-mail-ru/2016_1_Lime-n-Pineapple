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

            constructor(container, playerOwner) {
                _.extend(this, Backbone.Events);
                let duration = 200;
                this.frames = SETTING.fps * (duration/SETTING.second);
                this.sprite = new pixi.Sprite();
                this.container = container;
                this.playerOwner = playerOwner;
            }

            showInfoCard(cardModel, infoCardModel){
                let card = cardModel.cardView.sprite;
                this.sprite.texture = card.texture;
                this.calcSize(card.width * 2, card.height * 2);
                this.zeroMustPosition();
                this.zeroSpritePosition();
                Backbone.trigger("AddChildToStage", this.sprite);
                this.calcStartPositionForInfoCard(card);
                this.calcMustPosition(this.container.containerView.parent, this.container.containerView.x, this.container.containerView.y );
                this.calcDeltaAndRate();
                this.goToBack = true;
                console.log(this.goToBack + " OLOLO");
                Backbone.trigger("render::renderAnimation", this.moveCard.bind(this), this.frames);
                $(this).one("InfoCardInOwnContainer", function () {
                    console.log("showInfoCardOwnEvent");
                    infoCardModel.trigger("InfoCardInOwnContainer", cardModel);
                });
            }

            calcStartPositionForInfoCard(card){
                let cardX = card.x, cardY= card.y;
                while(card.parent.parent !== undefined) {
                    this.sprite.x += card.parent.x;
                    this.sprite.y += card.parent.y;
                    card = card.parent;
                }
                this.sprite.x += cardX;
                this.sprite.y += cardY;
            }

            moveCard(){
                this.sprite.x+=this.sprite.rateX;
                this.sprite.y+=this.sprite.rateY;
                if (Math.abs(this.sprite.x - this.sprite.mustX) < 10 && Math.abs(this.sprite.y - this.sprite.mustY) < 10){
                    console.log(this.goToBack + " MOVECARD");
                    if (!this.goToBack) {
                        $(this).trigger("CardOnPosition");
                        this.goToBack = true;
                    }
                    console.log("TriggerEvent");
                    $(this).trigger("InfoCardInOwnContainer");
                    this.zeroMustPosition();
                }
            }

            calcSize(width, height){
                this.sprite.width = width;
                this.sprite.height = height;
                this.sprite.anchor.set(0.5);
            }

            calcMustPosition(object, cardPositionInContainerX, cardPositionInContainerY){
                let par = object;
                while(par.parent){
                    this.sprite.mustX += par.x;
                    this.sprite.mustY += par.y;
                    par = par.parent;
                }
                this.sprite.mustX += cardPositionInContainerX;
                this.sprite.mustY +=cardPositionInContainerY;
            }

            moveToBattleField(cardModel, containerModel){
                this.zeroMustPosition();
                this.calcSize(cardModel.cardView.sprite.width, cardModel.cardView.sprite.height);
                this.calcMustPosition(containerModel.containerView.containerView,
                    containerModel.cardCollection.length * cardModel.cardView.sprite.width + cardModel.cardView.sprite.width/2,
                    cardModel.cardView.sprite.y);
                this.calcDeltaAndRate();
                this.goToBack = false;
                cardModel.cardView.sprite.parent.removeChild(cardModel.cardView.sprite);

                Backbone.trigger("render::renderAnimation", this.moveCard.bind(this), this.frames);
                $(this).one("CardOnPosition", function () {
                    containerModel.trigger("AbstractCardContainerModel::AddChildToBattle", cardModel);
                    if (this.sprite.parent) {
                        this.sprite.parent.removeChild(this.sprite);
                    }
                    this.trigger("InfoCardInBattleContainer", cardModel);
                    this.playerOwner.trigger("AbstractPlayer::GraphicsVisibleAndEventsOnForContainer");
                    this.playerOwner.trigger("AbstractPlayer::RemoveGapsInDeck");
                }.bind(this));
            }

            zeroSpritePosition(){
                this.sprite.x = 0;
                this.sprite.y = 0;
            }

            zeroMustPosition(){
                this.sprite.mustX = 0;
                this.sprite.mustY = 0;
            }

            calcDeltaAndRate(){
                this.sprite.deltaX = this.sprite.mustX - this.sprite.x;
                this.sprite.deltaY = this.sprite.mustY - this.sprite.y;
                this.sprite.rateX = this.sprite.deltaX/this.frames;
                this.sprite.rateY = this.sprite.deltaY/this.frames;
            }


            backToDeck(cardModel){
                let card = cardModel.cardView;
                if (this.goToBack) {
                    this.zeroMustPosition();
                    this.calcSize(card.sprite.width, card.sprite.height);
                    this.calcMustPosition(card.sprite.parent, card.sprite.x, card.sprite.y);
                    this.calcDeltaAndRate();
                    this.goToBack = false;
                    $(this).off("InfoCardInOwnContainer");
                    Backbone.trigger("render::renderAnimation", this.moveCard.bind(this), this.frames);
                }
                $(this).one("CardOnPosition", function () {
                    if (this.sprite.parent){
                        this.sprite.parent.removeChild(this.sprite);
                        this.trigger("InfoCardInContainer", cardModel);
                        this.goToBack = true;
                        console.log(this.goToBack);
                    }
                }.bind(this));
            }
        }
        return InfoCardView;
    }
);


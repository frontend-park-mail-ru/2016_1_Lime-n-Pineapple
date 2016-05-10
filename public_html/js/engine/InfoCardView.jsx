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

            constructor(container) {
                _.extend(this, Backbone.Events);
                let duration =1150;
                this.frames = SETTING.fps * (duration/SETTING.second);
                this.sprite = new pixi.Sprite();
                this.container = container;
            }

            showInfoCard(card){
                this.sprite.texture = card.texture;
                this.calcSize(card.width * 2, card.height * 2);
                this.zeroMustPosition();
                this.zeroSpritePosition();
                Backbone.trigger("AddChildToStage", this.sprite);
                this.calcStartPositionForInfoCard(card);
                this.calcMustPosition(this.container.containerView.parent, this.container.containerView.x, this.container.containerView.y );
                this.calcDeltaAndRate();
                Backbone.trigger("render::renderAnimation", this.moveCard.bind(this), this.frames);
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

            moveToBattleField(cardModel, containerModel, playerOwner){
                this.zeroMustPosition();
                this.calcSize(cardModel.cardView.sprite.width, cardModel.cardView.sprite.height);
                this.calcMustPosition(containerModel.containerView.containerView,
                    containerModel.cardCollection.length * cardModel.cardView.sprite.width + cardModel.cardView.sprite.width/2,
                    cardModel.cardView.sprite.y);
                this.calcDeltaAndRate();
                this.goToBack = false;
                Backbone.trigger("render::renderAnimation", this.moveCard.bind(this), this.frames);
                $(this).one("CardOnPosition", function () {
                    containerModel.trigger("AbstractCardContainerModel::AddChildToBattle", cardModel);
                    if (this.sprite.parent) {
                        this.sprite.parent.removeChild(this.sprite);
                    }
                    this.trigger("InfoCardInContainer", cardModel);
                    playerOwner.trigger("AbstractPlayer::GraphicsVisibleAndEventsOnForContainer");
                    playerOwner.trigger("AbstractPlayer::RemoveGapsInDeck");
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
                this.goToBack = true;
            }


            backToDeck(cardModel){
                let card = cardModel.cardView;
                if (this.goToBack) {
                    this.zeroMustPosition();
                    this.calcSize(card.sprite.width, card.sprite.height);
                    this.calcMustPosition(card.sprite.parent, card.sprite.x, card.sprite.y);
                    this.calcDeltaAndRate();
                    this.goToBack = false;
                    Backbone.trigger("render::renderAnimation", this.moveCard.bind(this), this.frames);
                }
                $(this).one("CardOnPosition", function (event) {
                    if (this.sprite.parent){
                        this.sprite.parent.removeChild(this.sprite);
                        this.trigger("InfoCardInContainer", cardModel);
                        this.goToBack = true;
                    }
                }.bind(this));
            }
        }
        return InfoCardView;
    }
);


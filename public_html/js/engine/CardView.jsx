"use strict";
define([
    'backbone',
    'underscore',
    'pixi'
],
    function (Backbone, _, pixi) {
        class Card{
            constructor(loaderRes, oneLineHeight) {
                this.texture = new pixi.Texture.fromImage(loaderRes['card' + (Math.floor(Math.random() * (8 - 1 + 1)) + 1)].url);
                this.sprite = new pixi.Sprite(this.texture);
                this.sprite.interactive = true;
                this.sprite.buttonMode = true;
                this.sprite.width = this.sprite.width * oneLineHeight * 1.2 / this.sprite.height;
                this.sprite.height = oneLineHeight;
                
                _.extend(this, Backbone.Events);
                
                this
                    .on("SetPositionInDeck", function(index, containerView){
                        this.setPositionIntoDeck(index, containerView);
                    }, this)
                    .on("SetTouchEventCard", function(){
                        this.setTouchEventCard();
                    }, this);

            }

            moveCard(card){
                card.x+=card.rateX;
                card.y+=card.rateY;
                if (Math.abs(card.x - card.mustX) < 10 && Math.abs(card.y - card.mustY) < 10){
                    this.trigger("CardMoved");
                }
            }

            _createInfoCard(){
                this.infoCard = new pixi.Sprite(this.texture);
                this.infoCard.width = this.sprite.width * 2;
                this.infoCard.height = this.sprite.height * 2;
                this.infoCard.anchor.set(0.5);
                this.sprite.parent.parent.trigger("AddChildToStage", this.infoCard);
                this.infoCard.x = this.sprite.x;
                this.infoCard.y = this.sprite.parent.y;
                this.infoCard.mustX = this.sprite.parent.parent.width + this.infoCard.width / 2;
                this.infoCard.mustY = this.infoCard.height / 2;
                this.infoCard.deltaX = this.infoCard.mustX - this.infoCard.x;
                this.infoCard.deltaY = this.infoCard.mustY - this.infoCard.y;
                this.infoCard.rateX = this.infoCard.deltaX/10;
                this.infoCard.rateY = this.infoCard.deltaY/10;
                Backbone.trigger("InfoCardAreCreated", this.infoCard);
                Backbone.trigger("CardMoveToCeil", this.moveCard, this.infoCard);
            }

            onClickCard(event){
                switch (event.data.originalEvent.which) {
                    case 1:
                        if (this.sprite.alpha === 0.1){
                            this.sprite.alpha = 1;
                            //Backbone.trigger("CardBackIntoDesc");
                        }
                        else {

                            this.sprite.interactive = true;
                            this.sprite.alpha = 0.1;
                            this._createInfoCard();

                            Backbone.trigger("CardPressed", this.sprite, this.infoCard);
                        }
                        break;
                }
            }

            setTouchEventCard(){
                this.sprite
                    .on('click', function(event) {
                        this.onClickCard(event);
                    }, this)
                    .on('touchstart', function(event) {
                        this.onClickCard(event);
                    }, this);
            }
            
            setPositionIntoDeck(index, containerView){
                this.sprite.x = this.sprite.width *
                    index + 2 * index + this.sprite.width / 2;
                this.sprite.y = this.sprite.y +
                    this.sprite.height / 2;
                this.sprite.anchor.set(0.5);
                containerView.trigger("AddChild", this.sprite);
            }
        }
        return Card;
    }
);


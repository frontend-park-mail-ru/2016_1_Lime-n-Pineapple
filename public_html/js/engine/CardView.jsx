"use strict";
define([
    'backbone',
    'underscore',
    'pixi',
    './CardsScenario'
],
    function (Backbone, _, pixi, CardScenario) {
        class Card extends CardScenario{
            constructor(loaderRes, oneLineHeight) {
                super();
                this.texture = new pixi.Texture.fromImage(loaderRes['card' + (Math.floor(Math.random() * (8 - 1 + 1)) + 1)].url);
                this.sprite = new pixi.Sprite(this.texture);
                this.sprite.interactive = true;
                this.sprite.buttonMode = true;
                this.sprite.width = this.sprite.width * oneLineHeight * 1.2 / this.sprite.height;
                this.sprite.height = oneLineHeight;
                
                //_.extend(this, Backbone.Events);

            }

            //moveCard(card){
            //    card.x+=card.rateX;
            //    card.y+=card.rateY;
            //    if (Math.abs(card.x - card.mustX) < 10 && Math.abs(card.y - card.mustY) < 10){
            //        this.trigger("CardMoved");
            //    }
            //}


            onClickCard(event, cardModel){
                switch (event.data.originalEvent.which) {
                    case 1:
                        if (this.sprite.alpha === 0.1){
                            this.sprite.alpha = 1;
                            //Backbone.trigger("CardBackIntoDesc");
                        }
                        else {

                            this.sprite.interactive = true;
                            this.sprite.alpha = 0.1;

                            cardModel.trigger("CardViewPressed");
                        }
                        break;
                }
            }

            setTouchEventCard(cardModel){
                this.sprite
                    .on('click', function(event) {
                        this.onClickCard(event, cardModel);
                    }, this)
                    .on('touchstart', function(event) {
                        this.onClickCard(event, cardModel);
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


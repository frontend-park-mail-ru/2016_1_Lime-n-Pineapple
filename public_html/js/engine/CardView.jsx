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


            }

            onClickCard(event, cardModel){
                switch (event.data.originalEvent.which) {
                    case 1:
                        if (this.sprite.alpha === 0.1){
                            cardModel.trigger("InfoCardBackToDeck");
                        }
                        else {
                            this.sprite.alpha = 0.1;
                            this.on("AlphaVisible", function(){
                                this.sprite.alpha = 1;
                                this.off("AlphaVisible");
                            }, this);
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


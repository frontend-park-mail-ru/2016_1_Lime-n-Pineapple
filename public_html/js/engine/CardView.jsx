"use strict";
define([
    'backbone',
    'underscore',
    'pixi',
    'jquery',
    './Settings'
],
    function (Backbone, _, pixi, $, SETTINGS) {
        class Card{
            constructor(url) {
                this.texture = new pixi.Texture.fromImage(url);
                this.sprite = new pixi.Sprite(this.texture);
                this.sprite.interactive = true;
                this.sprite.buttonMode = true;
                this.sprite.width = SETTINGS.cardWidth;
                this.sprite.height = SETTINGS.oneLineHeight;
                _.extend(this, Backbone.Events);
            }

            onClickCard(event, cardModel){
                switch (event.data.originalEvent.which) {
                    case 1:
                        if (this.sprite.alpha === 0.1){
                            cardModel.trigger("CardModel::InfoCardBackToDeck");
                        }
                        else {
                            this.sprite.alpha = 0.1;
                            this.on("CardView::AlphaVisible", function(){
                                this.sprite.alpha = 1;
                                this.off("AlphaVisible");
                            }, this);
                            cardModel.trigger("CardModel::CardViewPressed");
                        }
                        break;
                }
            }

            onMouseOver(event, cardModel){
                let filter = new pixi.filters.ColorMatrixFilter();
                this.sprite.filters = [filter];
                filter.brightness(1.5);
                this.sprite.y-=10;
            }

            onMouseOut(event, cardModel){
                this.sprite.y+=10;
                this.sprite.filters = null;
            }


            setTouchEventCard(cardModel){
                //_.extend(this.sprite, $.Events);

                this.sprite
                    .on('click', function(event) {
                        this.onClickCard(event, cardModel);
                    }, this)
                    .on('mouseover', function(event){
                        this.onMouseOver(event, cardModel);
                    }, this)
                    .on('mouseout', function(event){
                        this.onMouseOut(event, cardModel);
                    }, this);


            }
            
            setPositionIntoContainer(index, containerView){
                this.sprite.x = this.sprite.width *
                    index + 3 + this.sprite.width / 2;
                this.sprite.y = this.sprite.y +
                    this.sprite.height / 2;
                this.sprite.anchor.set(0.5);
                containerView.trigger("AddChild", this.sprite);
            }
        }
        return Card;
    }
);


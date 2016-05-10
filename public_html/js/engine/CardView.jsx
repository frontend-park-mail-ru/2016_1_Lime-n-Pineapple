"use strict";
define([
    'backbone',
    'underscore',
    'pixi',
    'jquery',
    './Settings'
],
    function (Backbone, _, pixi, $, SETTINGS) {
        class CardView{
            constructor(url) {
                this.sprite = new pixi.Sprite(new pixi.Texture.fromImage(url));
                this.sprite.interactive = true;
                this.sprite.buttonMode = true;
                this.sprite.width = SETTINGS.cardWidth;
                this.sprite.height = SETTINGS.oneLineHeight;
                _.extend(this, Backbone.Events);
            }

            onClickCard(cardModel){
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
            }

            onMouseOver(){
                let filter = new pixi.filters.ColorMatrixFilter();
                this.sprite.filters = [filter];
                filter.brightness(1.5);
                this.sprite.y-=10;
            }

            onMouseOut(){
                this.sprite.y+=10;
                this.sprite.filters = null;
            }


            setTouchEventCard(cardModel){
                this.sprite
                    .on('click', function() {
                        this.onClickCard(cardModel);
                    }, this)
                    .on('mouseover', function(){
                        this.onMouseOver();
                    }, this)
                    .on('mouseout', function(){
                        this.onMouseOut();
                    }, this);
            }

            setPosition(x, y){
                this.sprite.x = x;
                this.sprite.y = y;
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
        return CardView;
    }
);


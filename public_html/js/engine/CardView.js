"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'pixi', 'jquery', './Settings'], function (Backbone, _, pixi, $, SETTINGS) {
    var Card = function () {
        function Card(url) {
            _classCallCheck(this, Card);

            this.texture = new pixi.Texture.fromImage(url);
            this.sprite = new pixi.Sprite(this.texture);
            this.sprite.interactive = true;
            this.sprite.buttonMode = true;
            this.sprite.width = SETTINGS.cardWidth;
            this.sprite.height = SETTINGS.oneLineHeight;
            _.extend(this, Backbone.Events);
        }

        _createClass(Card, [{
            key: 'onClickCard',
            value: function onClickCard(event, cardModel) {
                switch (event.data.originalEvent.which) {
                    case 1:
                        if (this.sprite.alpha === 0.1) {
                            cardModel.trigger("CardModel::InfoCardBackToDeck");
                        } else {
                            this.sprite.alpha = 0.1;
                            this.on("CardView::AlphaVisible", function () {
                                this.sprite.alpha = 1;
                                this.off("AlphaVisible");
                            }, this);
                            cardModel.trigger("CardModel::CardViewPressed");
                        }
                        break;
                }
            }
        }, {
            key: 'onMouseOver',
            value: function onMouseOver(event, cardModel) {
                var filter = new pixi.filters.ColorMatrixFilter();
                this.sprite.filters = [filter];
                filter.brightness(1.5);
                this.sprite.y -= 10;
            }
        }, {
            key: 'onMouseOut',
            value: function onMouseOut(event, cardModel) {
                this.sprite.y += 10;
                this.sprite.filters = null;
            }
        }, {
            key: 'setTouchEventCard',
            value: function setTouchEventCard(cardModel) {
                //_.extend(this.sprite, $.Events);

                this.sprite.on('click', function (event) {
                    this.onClickCard(event, cardModel);
                }, this).on('mouseover', function (event) {
                    this.onMouseOver(event, cardModel);
                }, this).on('mouseout', function (event) {
                    this.onMouseOut(event, cardModel);
                }, this);
            }
        }, {
            key: 'setPositionIntoContainer',
            value: function setPositionIntoContainer(index, containerView) {
                this.sprite.x = this.sprite.width * index + 3 + this.sprite.width / 2;
                this.sprite.y = this.sprite.y + this.sprite.height / 2;
                this.sprite.anchor.set(0.5);
                containerView.trigger("AddChild", this.sprite);
            }
        }]);

        return Card;
    }();

    return Card;
});

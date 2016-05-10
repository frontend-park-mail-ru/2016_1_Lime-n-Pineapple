"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'pixi', 'jquery', './Settings'], function (Backbone, _, pixi, $, SETTINGS) {
    var CardView = function () {
        function CardView(url) {
            _classCallCheck(this, CardView);

            this.sprite = new pixi.Sprite(new pixi.Texture.fromImage(url));
            this.sprite.interactive = true;
            this.sprite.buttonMode = true;
            this.sprite.width = SETTINGS.cardWidth;
            this.sprite.height = SETTINGS.oneLineHeight;
            _.extend(this, Backbone.Events);
        }

        _createClass(CardView, [{
            key: 'onClickCard',
            value: function onClickCard(cardModel) {
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
            }
        }, {
            key: 'onMouseOver',
            value: function onMouseOver() {
                var filter = new pixi.filters.ColorMatrixFilter();
                this.sprite.filters = [filter];
                filter.brightness(1.5);
                this.sprite.y -= 10;
            }
        }, {
            key: 'onMouseOut',
            value: function onMouseOut() {
                this.sprite.y += 10;
                this.sprite.filters = null;
            }
        }, {
            key: 'setTouchEventCard',
            value: function setTouchEventCard(cardModel) {
                this.sprite.on('click', function () {
                    this.onClickCard(cardModel);
                }, this).on('mouseover', function () {
                    this.onMouseOver();
                }, this).on('mouseout', function () {
                    this.onMouseOut();
                }, this);
            }
        }, {
            key: 'setPosition',
            value: function setPosition(x, y) {
                this.sprite.x = x;
                this.sprite.y = y;
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

        return CardView;
    }();

    return CardView;
});

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['backbone', 'underscore', 'pixi', './CardsScenario'], function (Backbone, _, pixi, CardScenario) {
    var Card = function (_CardScenario) {
        _inherits(Card, _CardScenario);

        function Card(loaderRes, oneLineHeight) {
            _classCallCheck(this, Card);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Card).call(this));

            _this.texture = new pixi.Texture.fromImage(loaderRes['card' + (Math.floor(Math.random() * (8 - 1 + 1)) + 1)].url);
            _this.sprite = new pixi.Sprite(_this.texture);
            _this.sprite.interactive = true;
            _this.sprite.buttonMode = true;
            _this.sprite.width = _this.sprite.width * oneLineHeight * 1.2 / _this.sprite.height;
            _this.sprite.height = oneLineHeight;

            //_.extend(this, Backbone.Events);

            return _this;
        }

        //moveCard(card){
        //    card.x+=card.rateX;
        //    card.y+=card.rateY;
        //    if (Math.abs(card.x - card.mustX) < 10 && Math.abs(card.y - card.mustY) < 10){
        //        this.trigger("CardMoved");
        //    }
        //}

        _createClass(Card, [{
            key: 'onClickCard',
            value: function onClickCard(event, cardModel) {
                switch (event.data.originalEvent.which) {
                    case 1:
                        if (this.sprite.alpha === 0.1) {
                            this.sprite.alpha = 1;
                            //Backbone.trigger("CardBackIntoDesc");
                        } else {

                                this.sprite.interactive = true;
                                this.sprite.alpha = 0.1;

                                cardModel.trigger("CardViewPressed");
                            }
                        break;
                }
            }
        }, {
            key: 'setTouchEventCard',
            value: function setTouchEventCard(cardModel) {
                this.sprite.on('click', function (event) {
                    this.onClickCard(event, cardModel);
                }, this).on('touchstart', function (event) {
                    this.onClickCard(event, cardModel);
                }, this);
            }
        }, {
            key: 'setPositionIntoDeck',
            value: function setPositionIntoDeck(index, containerView) {
                this.sprite.x = this.sprite.width * index + 2 * index + this.sprite.width / 2;
                this.sprite.y = this.sprite.y + this.sprite.height / 2;
                this.sprite.anchor.set(0.5);
                containerView.trigger("AddChild", this.sprite);
            }
        }]);

        return Card;
    }(CardScenario);

    return Card;
});

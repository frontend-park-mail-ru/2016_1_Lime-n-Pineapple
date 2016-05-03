"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['jquery', 'backbone', 'pixi', './abstract_player'], function ($, Backbone, pixi, AbstractPlayer) {
    var Player = function (_AbstractPlayer) {
        _inherits(Player, _AbstractPlayer);

        function Player(loaderRes, oneLineHeight, container, stage, renderer) {
            _classCallCheck(this, Player);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this, loaderRes, oneLineHeight, stage, renderer));

            _this.createDesc(container);
            Backbone.on("CardAreThrown CardBackIntoDesc", function () {
                this._cardBackOrThrown();
            }, _this);
            return _this;
        }

        _createClass(Player, [{
            key: '_cardBackOrThrown',
            value: function _cardBackOrThrown() {
                this.stage.removeChild(this.infoCard);
                delete this.infoCard;
                for (var i = 0; i < this.container.children.length; i += 1) {
                    this.container.children[i].interactive = true;
                }
            }
        }, {
            key: 'act',
            value: function act() {}
        }, {
            key: 'createDesc',
            value: function createDesc(container) {
                console.log("[Player], createDesc");
                _get(Object.getPrototypeOf(Player.prototype), 'createDeck', this).call(this, container);
                this.setTouchEventCard();
            }
        }, {
            key: 'setTouchEventCard',
            value: function setTouchEventCard() {
                var _this2 = this;

                if (this.container.children.length) {
                    var _loop = function _loop(i) {
                        var card = _this2.container.getChildAt(i);
                        _this2.container.getChildAt(i).on('click', function (event) {
                            console.log(this.container.children.length);
                            this.onClickCard(event, this.container, card);
                        }, _this2).on('touchstart', function (event) {
                            this.onClickCard(event, this.container, card);
                        }, _this2);
                    };

                    for (var i = 0; i < this.container.children.length; i += 1) {
                        _loop(i);
                    }
                }
            }
        }, {
            key: 'onClickCard',
            value: function onClickCard(event, container, card) {
                switch (event.data.originalEvent.which) {
                    case 1:
                        if (card.alpha === 0.1) {
                            card.alpha = 1;
                            Backbone.trigger("CardBackIntoDesc");
                        } else {
                            this.actionCard = card;

                            for (var i = 0; i < container.children.length; i += 1) {
                                container.children[i].interactive = false;
                            }
                            card.interactive = true;
                            card.alpha = 0.1;
                            this._createInfoCard(card);

                            Backbone.trigger("CardPressed", card, this.infoCard);
                        }
                        break;
                }
            }
        }, {
            key: '_createInfoCard',
            value: function _createInfoCard(card) {
                this.infoCard = new pixi.Sprite(card.texture);
                this.infoCard.width = card.width * 2;
                this.infoCard.height = card.height * 2;
                this.infoCard.anchor.set(0.5);
                //this.infoCard.x = this.renderer.width - this.infoCard.width / 2;
                //this.infoCard.y = this.infoCard.height / 2;
                this.stage.addChild(this.infoCard);
                this.infoCard.x = card.x;
                this.infoCard.y = this.container.y;
                this.infoCard.mustX = this.renderer.width - this.infoCard.width / 2;
                this.infoCard.mustY = this.infoCard.height / 2;

                Backbone.trigger("InfoCardMoveToInfoCeil", this.infoCard);
            }
        }]);

        return Player;
    }(AbstractPlayer);

    return Player;
});

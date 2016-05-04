"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['jquery', 'backbone', 'pixi', './abstract_player'], function ($, Backbone, pixi, AbstractPlayer) {
    var Player = function (_AbstractPlayer) {
        _inherits(Player, _AbstractPlayer);

        function Player(loaderRes, container) {
            _classCallCheck(this, Player);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Player).call(this, loaderRes, container));

            _get(Object.getPrototypeOf(Player.prototype), 'createDeck', _this).call(_this);

            _this.on("PlayerAct", function () {
                this.act();
            }, _this);

            Backbone.on("CardAreThrown CardBackIntoDesc", function () {
                this._cardBackOrThrown();
            }, _this).on("InfoCardAreCreated", function (infoCard) {
                this.infoCard = infoCard;
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
            value: function act() {
                console.log("PLAYERACT");
                this.setTouchEventCard();
            }
        }, {
            key: 'setTouchEventCard',
            value: function setTouchEventCard() {
                for (var i = 0; i < this.cardCollection.length; i += 1) {
                    this.cardCollection[i].trigger("SetTouchEventCard");
                }
            }
        }]);

        return Player;
    }(AbstractPlayer);

    return Player;
});

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['jquery', 'backbone', 'pixi', './abstract_player'], function ($, Backbone, pixi, AbstractPlayer) {
    var Bot = function (_AbstractPlayer) {
        _inherits(Bot, _AbstractPlayer);

        function Bot(loaderRes, oneLineHeight, container, containerDistant, containerInfighting, stage, renderer) {
            _classCallCheck(this, Bot);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Bot).call(this, loaderRes, oneLineHeight, stage, renderer));

            _this.createDesc(container);
            Backbone.on("AIprocess", function () {
                this.act();
            }, _this);
            _this.containerDistant = containerDistant;
            _this.containerInfighting = containerInfighting;
            return _this;
        }

        _createClass(Bot, [{
            key: 'act',
            value: function act() {
                _get(Object.getPrototypeOf(Bot.prototype), 'act', this).call(this);
                if (this.container.children.length) {
                    var card = this.container.getChildAt(Math.floor(Math.random() * this.container.children.length));
                    this.container.removeChild(card);
                    var r = Math.floor(Math.random() * 2 + 1);
                    if (r === 1) {
                        this.containerDistant.addChild(card);
                        Backbone.trigger("RemoveGapsInDeckForAI", this.containerDistant);
                    } else {
                        this.containerInfighting.addChild(card);
                        Backbone.trigger("RemoveGapsInDeckForAI", this.containerInfighting);
                    }
                }
            }
        }, {
            key: 'createDesc',
            value: function createDesc(container) {
                _get(Object.getPrototypeOf(Bot.prototype), 'createDeck', this).call(this, container);
            }
        }]);

        return Bot;
    }(AbstractPlayer);

    return Bot;
});

"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'backbone', 'pixi', './card_collection'], function ($, Backbone, pixi, CardCollection) {
    var AbstractPlayer = function () {
        function AbstractPlayer(loaderRes, oneLineHeight, stage, renderer) {
            _classCallCheck(this, AbstractPlayer);

            this.cardCollection = new CardCollection(loaderRes, oneLineHeight);
            console.log(this.cardCollection);
            this.renderer = renderer;
            this.stage = stage;
        }

        _createClass(AbstractPlayer, [{
            key: 'act',
            value: function act() {
                console.log("[AbstractPlayer] constructor");
            }
        }, {
            key: 'createDeck',
            value: function createDeck(container) {
                console.log("[AbstractPlayer], createDesc");
                this.container = container;
                for (var i = 0; i < this.cardCollection.length; i += 1) {
                    this.cardCollection[i].cardStrite.x = this.cardCollection[i].cardStrite.width * i + 2 * i + this.cardCollection[i].cardStrite.width / 2;
                    this.cardCollection[i].cardStrite.y = this.cardCollection[i].cardStrite.y + this.cardCollection[i].cardStrite.height / 2;
                    this.cardCollection[i].cardStrite.anchor.set(0.5);
                    this.container.addChild(this.cardCollection[i].cardStrite);
                }
                console.log(this.container);
            }
        }]);

        return AbstractPlayer;
    }();

    return AbstractPlayer;
});

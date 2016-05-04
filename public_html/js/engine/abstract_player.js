"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'backbone', 'pixi', './card_collection'], function ($, Backbone, pixi, CardCollection) {

    var oneLineHeight = $(window).height() / 6;
    var width = $(window).width();

    var AbstractPlayer = function () {
        function AbstractPlayer(loaderRes, container, stage, renderer) {
            _classCallCheck(this, AbstractPlayer);

            _.extend(this, Backbone.Events);
            this.cardCollection = new CardCollection(loaderRes, oneLineHeight);
            this.playersCardDeck = container.playersCardsDeck;
            this.playersCardContainerInfightng = container.playersCardContainerInfighting;
            this.playerCardContainerDistant = container.playersCardContainerDistant;
            console.log(this.cardCollection);
            this.renderer = renderer;
            this.stage = stage;

            this.on("Act", function () {
                this.trigger("PlayerAct");
            }, this);
        }

        _createClass(AbstractPlayer, [{
            key: 'act',
            value: function act() {
                console.log("[AbstractPlayer] constructor");
            }
        }, {
            key: 'createDeck',
            value: function createDeck() {
                console.log("[AbstractPlayer], createDesc");
                this.playersCardDeck.trigger("CreatePlayersDeck", this.cardCollection);
            }
        }]);

        return AbstractPlayer;
    }();

    return AbstractPlayer;
});

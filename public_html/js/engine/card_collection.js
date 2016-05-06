"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './CardModel'], function ($, _, Backbone, Settings, pixi, Card) {
    var CardCollection = function () {
        function CardCollection(loaderRes, oneLineHeight) {
            _classCallCheck(this, CardCollection);

            this.cardCollection = [];
            _.extend(this.cardCollection, Backbone.Events);

            this.cardCollection.on("CreatePlayersDeck", function (containerView) {
                console.log("CardCollection on");
                this.setPosition(containerView);
            }, this);

            for (var i = 0; i < 8; i += 1) {
                this.cardCollection.push(new Card(loaderRes, oneLineHeight));
            }
            return this.cardCollection;
        }

        _createClass(CardCollection, [{
            key: 'setPosition',
            value: function setPosition(containerView) {
                for (var i = 0; i < this.cardCollection.length; i += 1) {
                    this.cardCollection[i].trigger("SetPositionInDeck", i, containerView);
                }
            }
        }]);

        return CardCollection;
    }();

    return CardCollection;
});

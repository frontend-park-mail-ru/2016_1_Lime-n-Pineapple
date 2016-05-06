"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'pixi', './CardView'], function (Backbone, _, pixi, CardView) {
    var Card = function () {
        function Card(loaderRes, oneLineHeight) {
            _classCallCheck(this, Card);

            _.extend(this, Backbone.Events);
            this.cardView = new CardView(loaderRes, oneLineHeight);

            this.on("CardModel::SetPositionInDeck", function (index, containerView) {
                this.setPositionIntoDeck(index, containerView);
            }, this).on("CardModel::SetTouchEventCard", function (player) {
                this.setTouchEventCard();
                this.playerOwner = player;
            }, this).on("CardModel::CardViewPressed", function () {
                this.playerOwner.trigger("AbstractPlayer::MustCreateInfoCard", this);
            }, this).on("CardModel::InfoCardBackToDeck", function () {
                this.playerOwner.trigger("AbstractPlayer::InfoCardBackToDeck", this);
            }, this);
        }

        _createClass(Card, [{
            key: 'setPositionIntoDeck',
            value: function setPositionIntoDeck(index, containerView) {
                this.cardView.setPositionIntoDeck(index, containerView);
            }
        }, {
            key: 'setTouchEventCard',
            value: function setTouchEventCard() {
                this.cardView.setTouchEventCard(this);
            }
        }]);

        return Card;
    }();

    return Card;
});

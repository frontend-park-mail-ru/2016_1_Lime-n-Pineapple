"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'pixi'], function (Backbone, _, pixi) {
    var Scenario = function () {
        function Scenario() {
            _classCallCheck(this, Scenario);

            _.extend(this, Backbone.Events);
        }

        _createClass(Scenario, [{
            key: 'moveCard',
            value: function moveCard(card) {
                card.x += card.rateX;
                card.y += card.rateY;
                if (Math.abs(card.x - card.mustX) < 10 && Math.abs(card.y - card.mustY) < 10) {
                    this.trigger("CardMoved");
                }
            }
        }]);

        return Scenario;
    }();

    return Scenario;
});

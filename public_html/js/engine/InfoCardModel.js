"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'pixi', './InfoCardView'], function (Backbone, _, pixi, InfoCardView) {
    var InfoCard = function InfoCard(card) {
        _classCallCheck(this, InfoCard);

        _.extend(this, Backbone.Events);
        this.InfoCardView = new InfoCardView(card);
    };

    return InfoCard;
});

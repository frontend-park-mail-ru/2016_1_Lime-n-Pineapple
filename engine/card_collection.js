"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './card-compiled'], function ($, _, Backbone, Settings, pixi, Card) {
    var CardCollection = function CardCollection(loaderRes) {
        _classCallCheck(this, CardCollection);

        this.cardCollection = [];
        for (var i = 0; i < 8; i += 1) {
            this.cardCollection.push(new Card(loaderRes));
        }
    };

    return CardCollection;
});

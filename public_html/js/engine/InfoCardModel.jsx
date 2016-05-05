"use strict";
define([
        'backbone',
        'underscore',
        'pixi',
        './InfoCardView'
    ],
    function (Backbone, _, pixi, InfoCardView) {
        class InfoCard{
            constructor(card) {
                _.extend(this, Backbone.Events);
                this.InfoCardView = new InfoCardView(card);

            }
        }
        return InfoCard;
    }
);

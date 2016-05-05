"use strict";
define([
        'backbone',
        'underscore',
        'pixi'
    ],
    function (Backbone, _, pixi) {
        class Scenario{
            constructor() {
                _.extend(this, Backbone.Events);
            }

            moveCard(card){
                card.x+=card.rateX;
                card.y+=card.rateY;
                if (Math.abs(card.x - card.mustX) < 10 && Math.abs(card.y - card.mustY) < 10){
                    this.trigger("CardMoved");
                }
            }
        }
        return Scenario;
    }
);


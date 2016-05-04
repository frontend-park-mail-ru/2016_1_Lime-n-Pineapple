"use strict";
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi'
], function ($, _, Backbone, Settings, pixi) {

    let oneLineHeight = $(window).height() / 6;
    let width = $(window).width();

    class AbstractCardContainerModel{

        constructor(cardContainerView) {
            _.extend(this, Backbone.Events);

            this.containerView = cardContainerView;

            //this.setContainerPosition();

            this.on("CardPressed", function () {
                this.containerView.on("mousedown", function(){

                }, this);
            }, this);

            this.on("CardAreThrown CardBackIntoDesc", function() {
                this.containerView.off("mousedown");
            }, this);



            this.on("RemoveGapsInDeck", function () {
                this.containerView.trigger("RemoveGapsInContainer");
            }, this);

            Backbone.on("SetContainerPosition", function(arrContainer, stage){
                AbstractCardContainerModel.setContainerPosition(arrContainer, stage, oneLineHeight);
            });


        }

        // nice work
        static setContainerPosition(arrContainer, stage, oneLineHeight) {
            let i = 4;
            _.forEach(arrContainer, function(value, key){
                stage.addChild(arrContainer[key].containerView.containerView);
                arrContainer[key].containerView.containerView.y = 0;
                arrContainer[key].containerView.containerView.x = 0;
                arrContainer[key].containerView.containerView.y = i * oneLineHeight;
                i-=1;
            });
        }
    }
    return AbstractCardContainerModel;
});
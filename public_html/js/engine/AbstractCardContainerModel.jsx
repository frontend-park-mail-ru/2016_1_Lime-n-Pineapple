"use strict";
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi',
    './Settings'
], function ($, _, Backbone, Settings, pixi, SETTINGS) {

    class AbstractCardContainerModel{

        constructor(cardContainerView) {
            _.extend(this, Backbone.Events);

            this.containerView = cardContainerView;
            this
                .on("CardPressed", function () {
                    this.containerView.on("mousedown", function(){
                    }, this);
                }, this)
                .on("CardAreThrown CardBackIntoDesc", function() {
                    this.containerView.off("mousedown");
                }, this)
                .on("RemoveGapsInDeck", function () {
                    this.containerView.trigger("RemoveGapsInContainer");
                }, this)
                .on("AbstractCardContainer::SetContainerPosition", function(stage, index, positionX){
                    this.setContainerPosition(stage, index, positionX);
                })
                .on("AbstractCardContainerModel::AddChild", function (child, x, y) {
                    this.addChildToContainer(child, x, y);
                }, this)
                .on("AbstractCardContainerModel::GraphicsVisible", function (value, eventsRecovery = false) {
                    this.containerView.edgingVisible(value);
                    if (eventsRecovery){
                        this.containerView.edgingEventsSetter();
                    }
                }, this)
                .on("AbstractCardContainerModel::SetClickListener", function (card) {
                    this.containerView.setClickEventsListener(card);
                });

            //this.containerView.containerView.on('click', function (event) {
            //
            //}, this);

            $(this).one("AbstractCardContainer::CreateGraphics", function (event, width, height, worldVisible, x, y) {
                console.log("AbstractCardContainer::CreateGraphics");
                console.log(width, height, x, y);
                this.containerView.createHitArea(width, height);
                if (x && y) {
                    this.containerView.createGraphicsEdging(width, height, worldVisible, x, y);
                }
                else{
                    this.containerView.createGraphicsEdging(width, height, worldVisible);
                }
            }.bind(this));
        }

        addChildToContainer(child, x, y){
            this.containerView.addChildToContainer(child, x, y);
        }

        // nice work
        setContainerPosition(stage, index, positionX) {
            stage.addChild(this.containerView.containerView);
            this.containerView.containerView.x = positionX;
            this.containerView.containerView.y = index * SETTINGS.oneLineHeight;
        }
    }
    return AbstractCardContainerModel;
});
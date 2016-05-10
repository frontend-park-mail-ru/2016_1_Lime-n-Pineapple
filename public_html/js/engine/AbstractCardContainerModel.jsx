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
            this.cardCollection = [];
            this.containerView = cardContainerView;
            this
                .on("AbstractCardContainerModel::SetContainerPosition", function(container, positionX, positionY){
                    this.setContainerPosition(container, positionX, positionY );
                })
                .on("AbstractCardContainerModel::SetPositionInContainer", function(object, x, y){
                    if (x && y) {
                        this.containerView.setPositionInContainer(object, x, y);
                    }
                    else{
                        let pX, pY;
                        pX = this.cardCollection.length * object.width + object.width/2 + 3;
                        pY = object.height/2;
                        this.containerView.setPositionInContainer(object, pX, pY);
                    }
                }, this)

                .on("AbstractCardContainerModel::SetCardToCardCollection", function (card) {
                    this.cardCollection.push(card);
                })

                .on("AbstractCardContainerModel::AddChildToBattle", function (childModel, x = undefined, y = undefined) {
                    let child = childModel.cardView;
                    if (x && y) {
                        this.addChildToContainer(child.sprite, x, y);
                    }
                    else {
                        x = this.cardCollection.length * (3 + child.sprite.width) + child.sprite.width/2 + 3;
                        y = child.sprite.height/2;
                        this.addChildToContainer(child.sprite, x, y);
                    }
                    this.cardCollection.push(childModel);
                }, this)

                .on("AbstractCardContainerModel::GraphicsVisible", function (value) {
                    this.containerView.edgingVisible(value);
                }, this)

                .on("AbstractCardContainerModel::SetGraphicsListener", function (isListen) {
                    this.containerView.edgingEventsSetter(this.containerView.graphics[0], isListen);
                }, this)

                .on("AbstractCardContainerModel::SetClickListener", function (card, infoCard) {
                    this.containerView.setClickEventsListener(card, infoCard, this);
                });

            $(this).one("AbstractCardContainerModel::CreateGraphics", function (event, width, height, worldVisible, x, y) {
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
        setContainerPosition(container, positionX, positionY ) {
            this.containerView.setContainerPosition(container, positionX, positionY);
        }

        deleteCardFromCardCollection(cardModel){
            for(let i = 0; i < this.cardCollection.length; i+=1){
                if (this.cardCollection[i].id === cardModel.id){
                    this.cardCollection.splice(i, 1);
                }
            }
        }
    }
    return AbstractCardContainerModel;
});
"use strict";
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi',
    './Settings'
],
    function ($, _, Backbone, Settings, pixi, SETTING) {



        class CardContainerView{

            constructor(interactive, buttonMode, visible = true) {

                _.extend(this, Backbone.Events);

                this.containerView = new pixi.Container();
                this.containerView.interactive = interactive;
                this.containerView.buttonMode = buttonMode;
                this.containerView.visible = visible;

                this.graphics = [];

                this.on("RemoveGapsInContainer", function(){
                    this.removeGapsInDeck();
                }, this);

                this.on("AddChild", function(sprite){
                    this.containerView.addChild(sprite);
                }, this);

            }

            setClickEventsListener(card, infoCard, containerModel){
                this.containerView.on('click', function () {
                    this.onClickContainer(card, infoCard, containerModel);
                }, this);
            }

            cleanClickEventsListener(){
                this.containerView.off('click');
            }

            onClickContainer(card, infoCard, containerModel) {
                infoCard.trigger("InfoCardModel::AddToBattlesContainer", card, containerModel);
            }

            edgingVisible(value){
                this.graphics[0].visible = value;
                this.containerView.off('mouseover');
                this.containerView.off('mouseout');
            }

            edgingEventsSetter(graph, isListen){
                if (isListen) {
                    this.containerView.on('mouseover', function () {
                        this.visible = true;
                    }, graph);
                    this.containerView.on('mouseout', function () {
                        this.visible = false;
                    }, graph);
                }
                else{
                    this.containerView.off('mouseover');
                    this.containerView.off('mouseout');
                }
            }



            addChildToContainer(child, x, y){
                this.containerView.addChild(child);
                child.x = x;
                child.y = y;
            }

            removeGapsInDeck(cardCollection) {
                let wid;
                if (cardCollection.length) {
                    wid = cardCollection[0].cardView.sprite.width;
                }
                for (let i = 0; i < cardCollection.length; i += 1) {
                    cardCollection[i].cardView.sprite.x = wid * i + 2 + wid / 2;
                }
            }

            createHitArea(width, height){
                this.containerView.hitArea = new pixi.Rectangle(0, 0, width, height);
            }

            createGraphicsEdging(width, height, worldVisible = true, x = 3, y = 0){
                let graph = new pixi.Graphics();
                this.graphics.push(graph);
                this.containerView.addChild(graph);
                graph.beginFill(0xffae80, 0.15);
                graph.lineStyle(3, 0xff8e4d, 0.3);
                graph.drawRect(x, y, width, height);
                graph.visible = false;
                graph.myWorldVisible = worldVisible;
                if (graph.myWorldVisible) {
                    this.edgingEventsSetter(graph, true);
                }
            }

            setContainerPosition(container, x, y){
                container.addChild(this.containerView);
                this.containerView.x = x;
                this.containerView.y = y;
            }

            createPlayersDeck(cardCollection){
                let sprite;
                for (let i = 0; i < cardCollection.length; i+=1) {
                    sprite = cardCollection[i].cardView.sprite;
                    sprite.x = sprite.width *
                        i + 3 + sprite.width / 2;
                    sprite.y = sprite.y +
                        sprite.height / 2;
                    sprite.anchor.set(0.5);
                    this.containerView.addChild(sprite);
                }
            }

            setPositionInContainer(object, x, y){
                object.x = x;
                object.y = y;
                object.anchor.set(0.5);
                this.containerView.addChild(object);
            }

        }
    return CardContainerView;
});
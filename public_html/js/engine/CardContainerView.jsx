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

            setClickEventsListener(card){
                this.containerView.on('click', function () {
                    this.onClickContainer(card);
                }, this);
            }

            cleanClickEventsListener(){
                this.containerView.off('click');
            }

            onClickContainer(card) {
                
            }

            edgingVisible(value){
                this.graphics[0].visible = value;
                this.containerView.off('mouseover');
                this.containerView.off('mouseout');
            }

            edgingEventsSetter(){
                this.containerView.on('mouseover', function () {
                    this.visible = true;
                }, this.graphics[0]);
                this.containerView.on('mouseout', function () {
                    this.visible = false;
                }, this.graphics[0]);
            }



            addChildToContainer(child, x, y){
                this.containerView.addChild(child);
                child.x = x;
                child.y = y;
            }

            removeGapsInDeck() {
                let wid;
                if (this.containerView.children.length) {
                    wid = this.containerView.getChildAt(0).width;
                }
                for (let i = 0; i < this.containerView.children.length; i += 1) {
                    this.containerView.getChildAt(i).x = wid * i + 2 + wid / 2;
                }
            }

            createHitArea(width, height){
                if (this.containerView.interactive && this.containerView.buttonMode) {
                    this.containerView.hitArea = new pixi.Rectangle(0, 0, width, height);
                }
            }

            createGraphicsEdging(width, height, worldVisible = true, x = 3, y = 0){
                let graphic = new pixi.Graphics();
                this.graphics.push(graphic);
                this.containerView.addChild(graphic);
                graphic.beginFill(0xffae80, 0.15);
                graphic.lineStyle(3, 0xff8e4d, 0.3);
                graphic.drawRect(x, y, width, height);
                graphic.visible = false;
                graphic.myWorldVisible = worldVisible;
                if (graphic.myWorldVisible) {
                    this.edgingEventsSetter();
                }
            }


        }
    return CardContainerView;
});
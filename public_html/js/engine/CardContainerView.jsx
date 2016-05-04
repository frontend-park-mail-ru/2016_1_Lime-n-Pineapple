"use strict";
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi'
],
    function ($, _, Backbone, Settings, pixi) {

        let oneLineHeight = $(window).height() / 6;
        let width = $(window).width();

        class CardContainerView{

            constructor(interactive, buttonMode) {

                _.extend(this, Backbone.Events)

                this.containerView = new pixi.Container();
                this.containerView.interactive = interactive;
                this.containerView.buttonMode = buttonMode;

                if (interactive && buttonMode){
                    this.containerView.hitArea = new pixi.Rectangle(0, 0, width / 1.5, oneLineHeight);
                }

                this.on("RemoveGapsInContainer", function(){
                    this.removeGapsInDeck();
                }, this);

                this.on("AddChild", function(sprite){
                    this.containerView.addChild(sprite);
                }, this);


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


        }
    return CardContainerView;
});
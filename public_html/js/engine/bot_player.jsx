"use strict";
define([
        'jquery',
        'backbone',
        'pixi',
        './abstract_player'
    ],  function ($, Backbone, pixi, AbstractPlayer) {
        class Bot extends AbstractPlayer{

            constructor(loaderRes, oneLineHeight, container, containerDistant, containerInfighting, stage, renderer){
                super(loaderRes, oneLineHeight, stage, renderer);
                this.createDesc(container);
                Backbone.on("AIprocess", function(){
                    this.act();
                }, this);
                this.containerDistant = containerDistant;
                this.containerInfighting = containerInfighting;
            }

            act(){
                super.act();
                if (this.container.children.length) {
                    var card = this.container.getChildAt((Math.floor(Math.random() * (this.container.children.length))));
                    this.container.removeChild(card);
                    let r = Math.floor(Math.random() * (2) + 1);
                    if (r === 1){
                        this.containerDistant.addChild(card);
                        Backbone.trigger("RemoveGapsInDeckForAI", this.containerDistant);
                    }
                    else{
                        this.containerInfighting.addChild(card);
                        Backbone.trigger("RemoveGapsInDeckForAI", this.containerInfighting);
                    }
                }
            }

            createDesc(container){
                super.createDeck(container);
            }


        }
        return Bot;
    }
);


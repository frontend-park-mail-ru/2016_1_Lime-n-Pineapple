"use strict";
define([
        'jquery',
        'backbone',
        'pixi',
        './card_collection'
],  function ($, Backbone, pixi, CardCollection) {
        class AbstractPlayer {

            constructor(loaderRes, oneLineHeight, stage, renderer){
                this.cardCollection = new CardCollection(loaderRes, oneLineHeight);
                console.log(this.cardCollection);
                this.renderer = renderer;
                this.stage = stage;

            }

            act(){
                console.log("[AbstractPlayer] constructor");
            }

            createDeck(container) {
                console.log("[AbstractPlayer], createDesc");
                this.container = container;
                for (let i = 0; i < this.cardCollection.length; i+=1) {
                    this.cardCollection[i].cardStrite.x = this.cardCollection[i].cardStrite.width *
                        i + 2 * i + this.cardCollection[i].cardStrite.width/2;
                    this.cardCollection[i].cardStrite.y = this.cardCollection[i].cardStrite.y +
                        this.cardCollection[i].cardStrite.height/2;
                    this.cardCollection[i].cardStrite.anchor.set(0.5);
                    this.container.addChild(this.cardCollection[i].cardStrite);
                }
                console.log(this.container);
            }

        }
        return AbstractPlayer;
    }
);


"use strict";
define([
        'jquery',
        'backbone',
        'pixi',
        './abstract_player-compiled'
    ],  function ($, Backbone, pixi, AbstractPlayer) {
        class Player extends AbstractPlayer{

            constructor(loaderRes, oneLineHeight, container, stage, renderer){
                super(loaderRes, oneLineHeight, stage, renderer);
                this.createDesc(container);
                Backbone.on("CardAreThrown", function(){
                    this.stage.removeChild(this.infoCard);
                }, this);
            }

            act(){

            }

            createDesc(container){
                console.log("[Player], createDesc");
                super.createDeck(container);
                this.setTouchEventCard();
            }

            setTouchEventCard(){
                if (this.container.children.length){
                    for (let i = 0; i < this.container.children.length; i+=1){
                        let card = this.container.getChildAt(i);
                        this.container.getChildAt(i)
                            .on('click', function(event) {
                                console.log(this.container.children.length);
                                this.onClickCard(event, this.container, card);
                            }, this)
                            .on('touchstart', function(event) {
                                this.onClickCard(event, this.container, card);
                            }, this);
                    }
                }
            }

            onClickCard(event, container, card) {
                switch (event.data.originalEvent.which) {
                    case 1:
                        if (card.alpha === 0.5){
                            card.alpha = 1;
                            Backbone.trigger("CardAreThrown");
                            //this.stage.removeChild(this.infoCard);
                            delete this.infoCard;
                            for (let i = 0; i < container.children.length; i+=1){
                                container.children[i].interactive = true;
                            }
                        }
                        else {
                            this.infoCard = new pixi.Sprite(card.texture);
                            this.actionCard = card;

                            for (let i = 0; i < container.children.length; i+=1){
                                container.children[i].interactive = false;
                            }
                            card.interactive = true;
                            card.alpha = 0.5;

                            this.infoCard.width = card.width * 2.5;
                            this.infoCard.height = card.height * 2.5;
                            this.infoCard.anchor.set(0.5);
                            this.infoCard.x = this.renderer.width - this.infoCard.width / 2;
                            this.infoCard.y = this.infoCard.height / 2;
                            this.stage.addChild(this.infoCard);
                            Backbone.trigger("CardPressed", this.actionCard);
                        }
                        break;
                }
            }
        }
        return Player;
    }
);


"use strict";
define([
        'jquery',
        'backbone',
        'pixi',
        './abstract_player'
    ],  function ($, Backbone, pixi, AbstractPlayer) {
        class Player extends AbstractPlayer{

            constructor(loaderRes, oneLineHeight, container, stage, renderer){
                super(loaderRes, oneLineHeight, stage, renderer);
                this.createDesc(container);
                Backbone.on("CardAreThrown CardBackIntoDesc", function(){
                    this._cardBackOrThrown();
                }, this);
            }

            _cardBackOrThrown(){
                this.stage.removeChild(this.infoCard);
                delete this.infoCard;
                for (let i = 0; i < this.container.children.length; i+=1){
                    this.container.children[i].interactive = true;
                }
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
                        if (card.alpha === 0.1){
                            card.alpha = 1;
                            Backbone.trigger("CardBackIntoDesc");
                        }
                        else {
                            this.actionCard = card;

                            for (let i = 0; i < container.children.length; i+=1){
                                container.children[i].interactive = false;
                            }
                            card.interactive = true;
                            card.alpha = 0.1;
                            this._createInfoCard(card);

                            Backbone.trigger("CardPressed", card, this.infoCard);
                        }
                        break;
                }
            }

            _createInfoCard(card){
                this.infoCard = new pixi.Sprite(card.texture);
                this.infoCard.width = card.width * 2;
                this.infoCard.height = card.height * 2;
                this.infoCard.anchor.set(0.5);
                //this.infoCard.x = this.renderer.width - this.infoCard.width / 2;
                //this.infoCard.y = this.infoCard.height / 2;
                this.stage.addChild(this.infoCard);
                this.infoCard.x = card.x;
                this.infoCard.y = this.container.y;
                this.infoCard.mustX = this.renderer.width - this.infoCard.width / 2;
                this.infoCard.mustY = this.infoCard.height / 2;

                Backbone.trigger("InfoCardMoveToInfoCeil", this.infoCard);
            }
        }
        return Player;
    }
);


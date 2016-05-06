"use strict";
define([
        'jquery',
        'backbone',
        'pixi',
        './abstract_player'

    ],  function ($, Backbone, pixi, AbstractPlayer) {
        class Player extends AbstractPlayer{

            constructor(loaderRes, container){
                super(loaderRes, container);

                super.createDeck();

                this.on("Player::PlayerAct", function(){
                    this.act();
                }, this);


                Backbone
                    .on("CardAreThrown CardBackIntoDesc", function(){
                        this._cardBackOrThrown();
                    }, this)
                    .on("InfoCardAreCreated", function(infoCard){
                        this.infoCard = infoCard;
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
                console.log("PLAYERACT");
                this.setTouchEventCard();
            }

            setTouchEventCard(){
                for (let i = 0; i < this.cardCollection.length; i+=1){
                    this.cardCollection[i].trigger("CardModel::SetTouchEventCard", this);
                }
            }


        }
        return Player;
    }
);


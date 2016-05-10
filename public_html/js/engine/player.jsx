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

                for (let i = 0; i < this.cardCollection.length; i+=1){
                    this.setTouchEventCard(this.cardCollection[i]);
                }
                this.setTouchEventCard(this.bossCard);
            }

            act(){
            }

            setTouchEventCard(card){
                card.trigger("CardModel::SetTouchEventCard", this);
            }


        }
        return Player;
    }
);


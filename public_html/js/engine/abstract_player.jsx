"use strict";
define([
        'jquery',
        'backbone',
        'underscore',
        'pixi',
        './card_collection',
        './InfoCardModel',
        './CardBossModel'
],  function ($, Backbone, _, pixi, CardCollection, InfoCardModel, CardBossModel) {

        class AbstractPlayer {

            constructor(loaderRes, container){
                _.extend(this, Backbone.Events);
                this.loaderRes = loaderRes;
                this.cardCollection = new CardCollection(loaderRes);
                if (container.playersCardsDeck !== undefined) {
                    this.playersCardsDeck = container.playersCardsDeck;
                }
                this.playersCardContainerMelee = container.playersCardContainerMelee;
                this.playersCardContainerDistant = container.playersCardContainerDistant;
                this.playersContainerBoss = container.playersContainerBoss;
                this.playersContainerBossCard = container.playersContainerBossCard;
                this.playersInfoCardContainer = container.playersInfoCardContainer;
                this.enemyCardContainerMelee = container.enemyCardContainerMelee;
                this.enemyCardContainerDistant = container.enemyCardContainerDistant;
                this.createBossCard();

                this
                    .on("AbstractPlayer::Act", function(){
                        this.trigger("Player::PlayerAct");
                    }, this)
                    .on("AbstractPlayer::MustCreateInfoCard", function (card) {
                        if (this.infoCard === undefined) {
                            this.infoCard = new InfoCardModel(card, this.playersInfoCardContainer.containerView, this);
                            _.forEach(card.disposableContainers, function(value, key){
                                if (key === "melee"){
                                    this.playersCardContainerMelee.trigger("AbstractCardContainerModel::GraphicsVisible", value);
                                    if (value){
                                        this.playersCardContainerMelee.trigger("AbstractCardContainerModel::SetClickListener", card);
                                    }
                                }
                                if (key === "distant"){
                                    this.playersCardContainerDistant.trigger("AbstractCardContainerModel::GraphicsVisible", value);
                                    if (value){
                                        this.playersCardContainerDistant.trigger("AbstractCardContainerModel::SetClickListener", card);
                                    }
                                }
                                if (key === "enemyMelee"){
                                    this.enemyCardContainerMelee.trigger("AbstractCardContainerModel::GraphicsVisible", value);
                                    if (value){
                                        this.enemyCardContainerMelee.trigger("AbstractCardContainerModel::SetClickListener", card);
                                    }
                                }
                                if (key === "enemyDistant"){
                                    this.enemyCardContainerDistant.trigger("AbstractCardContainerModel::GraphicsVisible", value);
                                    if (value){
                                        this.enemyCardContainerDistant.trigger("AbstractCardContainerModel::SetClickListener", card);
                                    }
                                }
                            }, this);
                            this.infoCard.card = card;
                        }
                        else {
                            this.infoCard.trigger("InfoCardModel::BackToDeckPrevious", this.infoCard.card);
                            $(this).one("AbstractPlayer::PreviousInfoCardBackToDeck", function (event) {
                                console.log("AbstractPlayer::PreviousInfoCardBackToDeck");
                                this.trigger("AbstractPlayer::MustCreateInfoCard", card);
                            }.bind(this));
                        }
                    }, this)
                    .on("AbstractPlayer::MustDestroyInfoCard", function(){
                        delete this.infoCard;
                        $(this).trigger("AbstractPlayer::PreviousInfoCardBackToDeck");
                    }, this)
                    .on("AbstractPlayer::InfoCardBackToDeck", function(card){
                        this.infoCard.trigger("InfoCardModel::BackToDeck", card);
                        this.playersCardContainerMelee.trigger("AbstractCardContainerModel::GraphicsVisible", false, true);
                        this.playersCardContainerDistant.trigger("AbstractCardContainerModel::GraphicsVisible", false, true);
                        this.enemyCardContainerMelee.trigger("AbstractCardContainerModel::GraphicsVisible", false, true);
                        this.enemyCardContainerDistant.trigger("AbstractCardContainerModel::GraphicsVisible", false, true);
                    }, this);
            }

            act(){
                console.log("[AbstractPlayer] constructor");
            }

            createBossCard(){
                this.bossCard = new CardBossModel(this.loaderRes);
                this.bossCard.trigger("CardModel::SetPositionInContainer", 0, this.playersContainerBossCard.containerView);
            }

            createDeck() {
                console.log("[AbstractPlayer], createDesc");
                if (this.playersCardsDeck !== undefined) {
                    this.playersCardsDeck.trigger("PlayersCardsDeck::CreatePlayersDeck", this.cardCollection);
                }
            }

        }
        return AbstractPlayer;
    }
);
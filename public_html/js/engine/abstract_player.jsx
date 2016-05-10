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
                this.cardCollection = new CardCollection(loaderRes, 8);
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
                this.battleContainers = [this.playersCardContainerMelee, this.playersCardContainerDistant, this.enemyCardContainerMelee,
                    this.enemyCardContainerDistant];
                this.touchedCards = [];
                this.infoCard = new InfoCardModel(this.playersInfoCardContainer.containerView, this);
                this.createBossCard();

                this
                    .on("AbstractPlayer::Act", function(){
                        this.trigger("Player::PlayerAct");
                    }, this)

                    .on("AbstractPlayer::MustCreateInfoCard", function (card){
                        this.touchedCards.push(card);
                        if (this.infoCard.isHide) {
                            this.infoCard.trigger("InfoCardModel::ShowInfoCard", card);
                            this.definitionCardsClasses(card);
                            delete this.nowActiveContainer;
                            this.touchedCards.push(card);
                        }
                        else{
                            this.infoCard.trigger("InfoCardModel::BackToDeck", this.touchedCards[this.touchedCards.length - 2]);
                            let newCard = this.touchedCards[this.touchedCards.length - 1];
                            $(this.touchedCards[this.touchedCards.length - 2]).one("AbstractPlayer::PreviousInfoCardInDeck", function (){
                                this.trigger("AbstractPlayer::MustCreateInfoCard", newCard);
                            }.bind(this));
                        }

                    }, this)

                    .on("AbstractPlayer::InfoCardBackToDeck", function(card){
                        this.infoCard.trigger("InfoCardModel::BackToDeck", card);
                        this.setGraphicsVisible(false);
                        this.setGraphicsListener(true);
                    }, this)
                    .on("AbstractPlayer::GraphicsVisibleAndEventsOnForContainer", function () {
                        this.setGraphicsVisible(false);
                        this.setGraphicsListener(true);
                    }, this)
                    .on("AbstractPlayer::RemoveGapsInDeck", function () {
                        this.playersCardsDeck.trigger("PlayersCardsDeck::RemoveGapsInDeck");
                    }, this)
                    .on("AbstractPlayer::DeleteCardFromCardCollection", function (card) {
                        this.playersCardsDeck.trigger("PlayersCardsDeck::DeleteCardFromCardCollection", card);
                    }, this);
            }

            setGraphicsVisible(bool){
                for (let i = 0; i < this.battleContainers.length; i+=1){
                    this.battleContainers[i].trigger("AbstractCardContainerModel::GraphicsVisible", bool);
                }
            }

            setGraphicsListener(bool){
                for (let i = 0; i < this.battleContainers.length; i+=1){
                    this.battleContainers[i].trigger("AbstractCardContainerModel::SetGraphicsListener", bool);
                }
            }

            definitionCardsClasses(card){
                this.nowActiveContainer = [];
                this.playersCardContainerMelee.trigger("AbstractCardContainerModel::GraphicsVisible", card.disposableContainers.melee);
                if (card.disposableContainers.melee){
                    this.playersCardContainerMelee.trigger("AbstractCardContainerModel::SetClickListener", card, this.infoCard);
                    this.nowActiveContainer.push(this.playersCardContainerMelee);
                }

                this.playersCardContainerDistant.trigger("AbstractCardContainerModel::GraphicsVisible", card.disposableContainers.distant);
                if (card.disposableContainers.distant){
                    this.playersCardContainerDistant.trigger("AbstractCardContainerModel::SetClickListener", card, this.infoCard);
                    this.nowActiveContainer.push(this.playersCardContainerDistant);
                }

                this.enemyCardContainerMelee.trigger("AbstractCardContainerModel::GraphicsVisible", card.disposableContainers.enemyMelee);
                if (card.disposableContainers.enemyMelee){
                    this.enemyCardContainerMelee.trigger("AbstractCardContainerModel::SetClickListener", card, this.infoCard);
                    this.nowActiveContainer.push(this.enemyCardContainerMelee);
                }

                this.enemyCardContainerDistant.trigger("AbstractCardContainerModel::GraphicsVisible", card.disposableContainers.enemyDistant);
                if (card.disposableContainers.enemyDistant){
                    this.enemyCardContainerDistant.trigger("AbstractCardContainerModel::SetClickListener", card, this.infoCard);
                    this.nowActiveContainer.push(this.enemyCardContainerDistant);
                }
            }

            act(){
                console.log("[AbstractPlayer] constructor");
            }

            createBossCard(){
                this.bossCard = new CardBossModel(this.loaderRes);
                this.playersContainerBossCard.trigger("AbstractCardContainerModel::SetPositionInContainer", this.bossCard.cardView.sprite);
                this.playersContainerBossCard.trigger("AbstractCardContainerModel::SetCardToCardCollection", this.bossCard);
            }

            createDeck() {
                if (this.playersCardsDeck !== undefined) {
                    this.playersCardsDeck.trigger("PlayersCardsDeck::CreatePlayersDeck", this.cardCollection);
                }
            }

        }
        return AbstractPlayer;
    }
);
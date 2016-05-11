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
                this.playersBattleInfoCardContainer = container.playersBattleInfoCardContainer;
                this.battleContainers = [this.playersCardContainerMelee, this.playersCardContainerDistant, this.enemyCardContainerMelee,
                    this.enemyCardContainerDistant];
                this.touchedCards = [];
                this.infoCard = new InfoCardModel(this.playersInfoCardContainer.containerView, this);

                this.createBossCard();

                this
                    .on("AbstractPlayer::Act", function(){
                        this.trigger("Player::PlayerAct");
                    }, this)

                    .on("AbstractPlayer::InfoCardInOwnContainer", function (cardModel) {
                        this.definitionCardsClasses(cardModel);
                    }, this)

                    .on("AbstractPlayer::MustCreateInfoCard", function (cardModel){
                        this.touchedCards.push(cardModel);
                        if (this.infoCard.isHide) {
                            this.infoCard.trigger("InfoCardModel::ShowInfoCard", cardModel);
                            this.infoCard.alreadyGoingBack = false;
                        }
                        else{
                            this.createNewInfoCard();
                        }
                    }, this)

                    .on("AbstractPlayer::InfoCardBackToDeck", function(cardModel){
                        this.cleanClickListenerForContainers();
                        this.infoCard.alreadyGoingBack = !this.infoCard.alreadyGoingBack;
                        this.infoCard.trigger("InfoCardModel::BackToDeck", cardModel);
                        cardModel.trigger("CardModel::CleanClickEventCard");
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
                    .on("AbstractPlayer::DeleteCardFromCardCollection", function (cardModel) {
                        this.playersCardsDeck.trigger("PlayersCardsDeck::DeleteCardFromCardCollection", cardModel);
                    }, this)
                    .on("AbstractPlayer::AddInfoCardToBattlesContainer", function (container) {
                        this.touchedCards[this.touchedCards.length - 1].trigger("AbstractCardModel::ChangeClickListener");
                        this.infoCard.trigger("InfoCardModel::AddToBattlesContainer", this.touchedCards[this.touchedCards.length - 1], container);
                        this.touchedCards.length = 0;
                        this.cleanClickListenerForContainers();
                    }, this)
                    .on("AbstractPlayer::ShowBattlesInfoCard", function (cardModel) {
                        this.cleanClickListenerForContainers();
                        if(!this.infoCard.isHide){
                            this.trigger("AbstractPlayer::InfoCardBackToDeck", this.touchedCards[this.touchedCards.length - 1]);
                        }
                        $(this).one("AbstractPlayer::BattlesInfoCardCreated", function () {
                            cardModel.trigger("CardModel::CleanClickEventCard");
                            $(this).one("SendStage", function (event, stage) {
                                let count = 0;
                                stage.on('click', function () {
                                    count+=1;
                                    if (count === 2) {
                                        this.playersBattleInfoCardContainer.containerView.containerView.removeChild(cardModel.cardView.battlesInfoCard);
                                        cardModel.trigger("AbstractCardModel::ChangeClickListener");
                                        stage.off('click');
                                    }
                                }.bind(this));
                            }.bind(this));
                            Backbone.trigger("GetStage", this)
                            this.playersBattleInfoCardContainer.containerView.containerView.addChild(cardModel.cardView.battlesInfoCard);
                        }.bind(this));
                        cardModel.trigger("AbstractCardModel::CreateBattlesInfoCard");
                    }, this)
                    .on("AbstractPlayer::InfoCardInContainer", function () {
                        this.setGraphicsVisible(false);
                        this.setGraphicsListener(true);
                        this.touchedCards.length = 0;
                    }, this)
                    .on("AbstractPlayer::InfoCardAddedToBattle", function () {
                        this.infoCard.isHide = true;
                        this.touchedCards.length = 0;
                    }, this);
            }

            createNewInfoCard(){
                this.cleanClickListenerForContainers();
                this.setGraphicsVisible(false);
                if (!this.infoCard.alreadyGoingBack) {
                    this.infoCard.alreadyGoingBack = !this.infoCard.alreadyGoingBack;
                    this.trigger("AbstractPlayer::InfoCardBackToDeck", this.touchedCards[this.touchedCards.length - 2]);
                }
                let newCard = this.touchedCards[this.touchedCards.length - 1];
                $(this.touchedCards[this.touchedCards.length - 2]).one("AbstractPlayer::PreviousInfoCardInDeck", function (){
                    this.trigger("AbstractPlayer::MustCreateInfoCard", newCard);
                }.bind(this));
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

            cleanClickListenerForContainers(){
                for (let i = 0; i < this.battleContainers.length; i+=1){
                    this.battleContainers[i].trigger("AbstractCardContainerModel::CleanClickListener");
                }
            }

            definitionCardsClasses(card){
                this.nowActiveContainer = [];
                this.playersCardContainerMelee.trigger("AbstractCardContainerModel::GraphicsVisible", card.disposableContainers.melee);
                if (card.disposableContainers.melee){
                    this.playersCardContainerMelee.trigger("AbstractCardContainerModel::SetClickListener", this);
                    this.nowActiveContainer.push(this.playersCardContainerMelee);
                }

                this.playersCardContainerDistant.trigger("AbstractCardContainerModel::GraphicsVisible", card.disposableContainers.distant);
                if (card.disposableContainers.distant){
                    this.playersCardContainerDistant.trigger("AbstractCardContainerModel::SetClickListener", this);
                    this.nowActiveContainer.push(this.playersCardContainerDistant);
                }

                this.enemyCardContainerMelee.trigger("AbstractCardContainerModel::GraphicsVisible", card.disposableContainers.enemyMelee);
                if (card.disposableContainers.enemyMelee){
                    this.enemyCardContainerMelee.trigger("AbstractCardContainerModel::SetClickListener", this);
                    this.nowActiveContainer.push(this.enemyCardContainerMelee);
                }

                this.enemyCardContainerDistant.trigger("AbstractCardContainerModel::GraphicsVisible", card.disposableContainers.enemyDistant);
                if (card.disposableContainers.enemyDistant){
                    this.enemyCardContainerDistant.trigger("AbstractCardContainerModel::SetClickListener", this);
                    this.nowActiveContainer.push(this.enemyCardContainerDistant);
                }
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
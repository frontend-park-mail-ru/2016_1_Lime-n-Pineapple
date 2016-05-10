"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'backbone', 'underscore', 'pixi', './card_collection', './InfoCardModel', './CardBossModel'], function ($, Backbone, _, pixi, CardCollection, InfoCardModel, CardBossModel) {
    var AbstractPlayer = function () {
        function AbstractPlayer(loaderRes, container) {
            _classCallCheck(this, AbstractPlayer);

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
            this.battleContainers = [this.playersCardContainerMelee, this.playersCardContainerDistant, this.enemyCardContainerMelee, this.enemyCardContainerDistant];
            this.touchedCards = [];
            this.infoCard = new InfoCardModel(this.playersInfoCardContainer.containerView, this);
            this.createBossCard();

            this.on("AbstractPlayer::Act", function () {
                this.trigger("Player::PlayerAct");
            }, this).on("AbstractPlayer::MustCreateInfoCard", function (card) {
                var _this = this;

                this.touchedCards.push(card);
                if (this.infoCard.isHide) {
                    this.infoCard.trigger("InfoCardModel::ShowInfoCard", card);
                    this.definitionCardsClasses(card);
                    delete this.nowActiveContainer;
                    this.touchedCards.push(card);
                } else {
                    (function () {
                        _this.infoCard.trigger("InfoCardModel::BackToDeck", _this.touchedCards[_this.touchedCards.length - 2]);
                        var newCard = _this.touchedCards[_this.touchedCards.length - 1];
                        $(_this.touchedCards[_this.touchedCards.length - 2]).one("AbstractPlayer::PreviousInfoCardInDeck", function () {
                            this.trigger("AbstractPlayer::MustCreateInfoCard", newCard);
                        }.bind(_this));
                    })();
                }
            }, this).on("AbstractPlayer::InfoCardBackToDeck", function (card) {
                this.infoCard.trigger("InfoCardModel::BackToDeck", card);
                this.setGraphicsVisible(false);
                this.setGraphicsListener(true);
            }, this).on("AbstractPlayer::GraphicsVisibleAndEventsOnForContainer", function () {
                this.setGraphicsVisible(false);
                this.setGraphicsListener(true);
            }, this).on("AbstractPlayer::RemoveGapsInDeck", function () {
                this.playersCardsDeck.trigger("PlayersCardsDeck::RemoveGapsInDeck");
            }, this).on("AbstractPlayer::DeleteCardFromCardCollection", function (card) {
                this.playersCardsDeck.trigger("PlayersCardsDeck::DeleteCardFromCardCollection", card);
            }, this);
        }

        _createClass(AbstractPlayer, [{
            key: 'setGraphicsVisible',
            value: function setGraphicsVisible(bool) {
                for (var i = 0; i < this.battleContainers.length; i += 1) {
                    this.battleContainers[i].trigger("AbstractCardContainerModel::GraphicsVisible", bool);
                }
            }
        }, {
            key: 'setGraphicsListener',
            value: function setGraphicsListener(bool) {
                for (var i = 0; i < this.battleContainers.length; i += 1) {
                    this.battleContainers[i].trigger("AbstractCardContainerModel::SetGraphicsListener", bool);
                }
            }
        }, {
            key: 'definitionCardsClasses',
            value: function definitionCardsClasses(card) {
                this.nowActiveContainer = [];
                this.playersCardContainerMelee.trigger("AbstractCardContainerModel::GraphicsVisible", card.disposableContainers.melee);
                if (card.disposableContainers.melee) {
                    this.playersCardContainerMelee.trigger("AbstractCardContainerModel::SetClickListener", card, this.infoCard);
                    this.nowActiveContainer.push(this.playersCardContainerMelee);
                }

                this.playersCardContainerDistant.trigger("AbstractCardContainerModel::GraphicsVisible", card.disposableContainers.distant);
                if (card.disposableContainers.distant) {
                    this.playersCardContainerDistant.trigger("AbstractCardContainerModel::SetClickListener", card, this.infoCard);
                    this.nowActiveContainer.push(this.playersCardContainerDistant);
                }

                this.enemyCardContainerMelee.trigger("AbstractCardContainerModel::GraphicsVisible", card.disposableContainers.enemyMelee);
                if (card.disposableContainers.enemyMelee) {
                    this.enemyCardContainerMelee.trigger("AbstractCardContainerModel::SetClickListener", card, this.infoCard);
                    this.nowActiveContainer.push(this.enemyCardContainerMelee);
                }

                this.enemyCardContainerDistant.trigger("AbstractCardContainerModel::GraphicsVisible", card.disposableContainers.enemyDistant);
                if (card.disposableContainers.enemyDistant) {
                    this.enemyCardContainerDistant.trigger("AbstractCardContainerModel::SetClickListener", card, this.infoCard);
                    this.nowActiveContainer.push(this.enemyCardContainerDistant);
                }
            }
        }, {
            key: 'act',
            value: function act() {
                console.log("[AbstractPlayer] constructor");
            }
        }, {
            key: 'createBossCard',
            value: function createBossCard() {
                this.bossCard = new CardBossModel(this.loaderRes);
                this.playersContainerBossCard.trigger("AbstractCardContainerModel::SetPositionInContainer", this.bossCard.cardView.sprite);
                this.playersContainerBossCard.trigger("AbstractCardContainerModel::SetCardToCardCollection", this.bossCard);
            }
        }, {
            key: 'createDeck',
            value: function createDeck() {
                if (this.playersCardsDeck !== undefined) {
                    this.playersCardsDeck.trigger("PlayersCardsDeck::CreatePlayersDeck", this.cardCollection);
                }
            }
        }]);

        return AbstractPlayer;
    }();

    return AbstractPlayer;
});

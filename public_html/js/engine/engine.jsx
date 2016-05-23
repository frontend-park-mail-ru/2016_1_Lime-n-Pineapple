"use strict";
define([
        'jquery',
        'underscore',
        'backbone',
        'pixi',
        './player',
        './bot_player',
        './CardContainerModel',
        './CardContainerView',
        './player_cards_deck',
        './Settings',
        './EventsConfig'
    ], function ($, _, Backbone, pixi, Player, Bot, CardContainerModel, CardContainerView, PlayerCardsDeck, SETTINGS, Events) {

        class Engine {

            constructor(loaderRes) {
                let playerCardsDeckView = new CardContainerView(true, true),
                    playerCardsDeck = new PlayerCardsDeck(playerCardsDeckView),
                    playersCardContainerMeleeView = new CardContainerView(true, true),
                    playersCardContainerMelee = new CardContainerModel(playersCardContainerMeleeView),
                    playersCardContainerDistantView = new CardContainerView(true, true),
                    playersCardContainerDistant = new CardContainerModel(playersCardContainerDistantView),
                    playersContainerBossView = new CardContainerView(true, true),
                    playersContainerBoss = new CardContainerModel(playersContainerBossView),
                    playersContainerBossCardView = new CardContainerView(true, true),
                    playersContainerBossCard = new CardContainerModel(playersContainerBossCardView),

                    enemyCardsDeckView = new CardContainerView(false, false, false),
                    enemyCardsDeck = new PlayerCardsDeck(enemyCardsDeckView),
                    enemyCardContainerMeleeView = new CardContainerView(true, true),
                    enemyCardContainerMelee = new CardContainerModel(enemyCardContainerMeleeView),
                    enemyCardContainerDistantView = new CardContainerView(true, true),
                    enemyCardContainerDistant = new CardContainerModel(enemyCardContainerDistantView),
                    enemyContainerBossView = new CardContainerView(true, true),
                    enemyContainerBoss = new CardContainerModel(enemyContainerBossView),
                    enemyContainerBossCardView = new CardContainerView(true, true),
                    enemyContainerBossCard = new CardContainerModel(enemyContainerBossCardView);

                let playersInfoCardContainerView = new CardContainerView(false, false),
                    playersInfoCardContainer = new CardContainerModel(playersInfoCardContainerView),
                    playersBattleInfoCardContainerView = new CardContainerView(true, true),
                    playersBattleInfoCardContainer = new CardContainerModel(playersBattleInfoCardContainerView);

                this.container = {
                    "playersCardsDeck"                  :   playerCardsDeck,
                    "playersCardContainerDistant"       :   playersCardContainerDistant,
                    "playersCardContainerMelee"         :   playersCardContainerMelee,
                    "enemyCardContainerMelee"           :   enemyCardContainerMelee,
                    "enemyCardContainerDistant"         :   enemyCardContainerDistant,
                    "enemyCardsDeck"                    :   enemyCardsDeck,
                    "playersContainerBoss"              :   playersContainerBoss,
                    "enemyContainerBoss"                :   enemyContainerBoss,
                    "playersContainerBossCard"          :   playersContainerBossCard,
                    "enemyContainerBossCard"            :   enemyContainerBossCard,
                    "playersInfoCardContainer"          :   playersInfoCardContainer,
                    "playersBattleInfoCardContainer"    :   playersBattleInfoCardContainer
                };

                this.loaderRes = loaderRes;

                Backbone.on("AllRendered", function(stage){
                    this.battlesContainer = {
                        "playersCardsDeck"                  :   playerCardsDeck,
                        "playersCardContainerDistant"       :   playersCardContainerDistant,
                        "playersCardContainerMelee"         :   playersCardContainerMelee,
                        "enemyCardContainerMelee"           :   enemyCardContainerMelee,
                        "enemyCardContainerDistant"         :   enemyCardContainerDistant,
                        "enemyCardsDeck"                    :   enemyCardsDeck
                    };
                    let i = 4;
                    _.forEach(this.battlesContainer, function(value, key, iter){
                        iter[key].trigger("AbstractCardContainerModel::SetContainerPosition", stage, SETTINGS.battleContainerPositionX, i * SETTINGS.oneLineHeight);
                        $(iter[key]).trigger("AbstractCardContainerModel::CreateGraphics", [SETTINGS.deckWidth, SETTINGS.oneLineHeight]);
                        i-=1;
                    }, this);
                    this.container.playersContainerBoss.trigger("AbstractCardContainerModel::SetContainerPosition", stage, 10, 3 * SETTINGS.oneLineHeight);
                    $(this.container.playersContainerBoss).trigger("AbstractCardContainerModel::CreateGraphics", [SETTINGS.battleContainerPositionX - 10,
                        SETTINGS.oneLineHeight, false]);
                    this.container.playersContainerBossCard.trigger("AbstractCardContainerModel::SetContainerPosition", this.container.playersContainerBoss.containerView.containerView,
                        0, 0);
                    $(this.container.playersContainerBossCard).trigger("AbstractCardContainerModel::CreateGraphics", [SETTINGS.cardWidth,
                        SETTINGS.oneLineHeight]);

                    this.container.enemyContainerBoss.trigger("AbstractCardContainerModel::SetContainerPosition", stage, 10, 0);
                    $(this.container.enemyContainerBoss).trigger("AbstractCardContainerModel::CreateGraphics", [SETTINGS.battleContainerPositionX - 10,
                        SETTINGS.oneLineHeight, false]);
                    this.container.enemyContainerBossCard.trigger("AbstractCardContainerModel::SetContainerPosition", this.container.enemyContainerBoss.containerView.containerView,
                        0, 0);
                    $(this.container.enemyContainerBossCard).trigger("AbstractCardContainerModel::CreateGraphics", [SETTINGS.cardWidth,
                        SETTINGS.oneLineHeight]);

                    this.container.playersInfoCardContainer.trigger("AbstractCardContainerModel::SetContainerPosition", stage,
                        SETTINGS.infoCardContainerPositionX, 2 * SETTINGS.oneLineHeight);

                    this.container.playersBattleInfoCardContainer.trigger("AbstractCardContainerModel::SetContainerPosition", stage,
                        SETTINGS.infoBattleCardContainerPositionX, SETTINGS.infoBattleCardContainerPositionY);



                    this.engineWork();
                }, this);

                Backbone.trigger("GameRender");
            }

            engineWork(){
                let containerPlayer = {
                    "playersCardsDeck"                  :   this.container.playersCardsDeck,
                    "playersCardContainerDistant"       :   this.container.playersCardContainerDistant,
                    "playersCardContainerMelee"         :   this.container.playersCardContainerMelee,
                    "playersContainerBoss"              :   this.container.playersContainerBoss,
                    "playersContainerBossCard"          :   this.container.playersContainerBossCard,
                    "playersInfoCardContainer"          :   this.container.playersInfoCardContainer,
                    "enemyCardContainerMelee"           :   this.container.enemyCardContainerMelee,
                    "enemyCardContainerDistant"         :   this.container.enemyCardContainerDistant,
                    "playersBattleInfoCardContainer"    :   this.container.playersBattleInfoCardContainer
                };

                let containerEnemy = {
                    "playersCardsDeck"                  :   this.container.enemyCardsDeck,
                    "playersCardContainerMelee"         :   this.container.enemyCardContainerMelee,
                    "playersCardContainerDistant"       :   this.container.enemyCardContainerDistant,
                    "playersContainerBoss"              :   this.container.enemyContainerBoss,
                    "playersContainerBossCard"          :   this.container.enemyContainerBossCard,
                    "playersInfoCardContainer"          :   this.container.playersInfoCardContainer,
                    "enemyCardContainerDistant"         :   this.container.playersCardContainerDistant,
                    "enemyCardContainerMelee"           :   this.container.playersCardContainerMelee,
                    "playersBattleInfoCardContainer"    :   this.container.playersBattleInfoCardContainer
                };

                this.player = new Player(this.loaderRes, containerPlayer);
                this.enemy  = new Bot   (this.loaderRes, containerEnemy);

                let whoFirst = Math.floor(Math.random() * (2) + 1);
                this.game(whoFirst);
            }

            game(whoFirst){
                if (whoFirst === 1 || whoFirst === 2){
                    this.player.trigger(Events.Game.AbstractPlayer.Act);
                }
                else if (whoFirst === 2){
                    this.enemy.trigger(Events.Game.AbstractPlayer.Act);
                }
            }
        }
        return Engine;
    }
);


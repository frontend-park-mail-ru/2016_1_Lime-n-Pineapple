"use strict";
define([
        'jquery',
        'underscore',
        'backbone',
        'settings',
        'pixi',
        './player',
        './bot_player',
        './CardContainerModel',
        './CardContainerView',
        './player_cards_deck'
    ], function ($, _, Backbone, Settings, pixi, Player, Bot, CardContainerModel, CardContainerView, PlayerCardsDeck) {

        class Engine {

            constructor(loaderRes) {
                let playerCardsDeckView = new CardContainerView(),
                    playerCardsDeck = new PlayerCardsDeck(playerCardsDeckView),
                    playersCardContainerMeleeView = new CardContainerView(true, true),
                    playersCardContainerMelee = new CardContainerModel(playersCardContainerMeleeView),
                    playersCardContainerDistantView = new CardContainerView(true, true),
                    playersCardContainerDistant = new CardContainerModel(playersCardContainerDistantView),

                    enemyCardsDeckView = new CardContainerView(),
                    enemyCardsDeck = new PlayerCardsDeck(enemyCardsDeckView),
                    enemyCardContainerMeleeView = new CardContainerView(true, true),
                    enemyCardContainerMelee = new CardContainerModel(enemyCardContainerMeleeView),
                    enemyCardContainerDistantView = new CardContainerView(true, true),
                    enemyCardContainerDistant = new CardContainerModel(enemyCardContainerDistantView);

                this.container = {
                    "playersCardsDeck"                  :   playerCardsDeck,
                    "playersCardContainerDistant"       :   playersCardContainerDistant,
                    "playersCardContainerMelee"         :   playersCardContainerMelee,
                    "enemyCardContainerMelee"           :   enemyCardContainerMelee,
                    "enemyCardContainerDistant"         :   enemyCardContainerDistant,
                    "enemyCardsDeck"                    :   enemyCardsDeck
                };

                this.loaderRes = loaderRes;

                Backbone.on("AllRendered", function(stage){
                    this.container.playersCardsDeck.trigger("AbstractCardContainer::SetContainerPosition", this.container, stage);
                    this.engineWork();
                }, this);

                Backbone.trigger("GameRender");
            }

            engineWork(){
                let containerPlayer = {
                    "playersCardsDeck"                  :   this.container.playersCardsDeck,
                    "playersCardContainerDistant"       :   this.container.playersCardContainerDistant,
                    "playersCardContainerMelee"         :   this.container.playersCardContainerMelee
                };

                let containerEnemy = {
                    "playersCardsDeck"                  :   this.container.enemyCardsDeck,
                    "playersCardContainerMelee"         :   this.container.enemyCardContainerMelee,
                    "playersCardContainerDistant"       :   this.container.enemyCardContainerDistant
                };
                this.player = new Player(this.loaderRes, containerPlayer);
                this.enemy  = new Bot   (this.loaderRes, containerEnemy);

                let whoFirst = Math.floor(Math.random() * (2) + 1);
                this.game(whoFirst);

            }

            game(whoFirst){
                if (whoFirst === 1 || whoFirst === 2){
                    this.player.trigger("AbstractPlayer::Act");
                }
                else if (whoFirst === 2){
                    this.enemy.trigger("AbstractPlayer::Act");
                }
            }
        }
        return Engine;
    }
);


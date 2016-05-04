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
                    playersCardContainerInfightingView = new CardContainerView(true, true),
                    playersCardContainerInfighting = new CardContainerModel(playersCardContainerInfightingView),
                    playersCardContainerDistantView = new CardContainerView(true, true),
                    playersCardContainerDistant = new CardContainerModel(playersCardContainerDistantView),

                    enemyCardsDeckView = new CardContainerView(),
                    enemyCardsDeck = new PlayerCardsDeck(enemyCardsDeckView),
                    enemyCardContainerInfightingView = new CardContainerView(true, true),
                    enemyCardContainerInfighting = new CardContainerModel(enemyCardContainerInfightingView),
                    enemyCardContainerDistantView = new CardContainerView(true, true),
                    enemyCardContainerDistant = new CardContainerModel(enemyCardContainerDistantView);

                this.container = {
                    "playersCardsDeck"                  :   playerCardsDeck,
                    "playersCardContainerDistant"       :   playersCardContainerDistant,
                    "playersCardContainerInfighting"    :   playersCardContainerInfighting,
                    "enemyCardContainerInfighting"      :   enemyCardContainerInfighting,
                    "enemyCardContainerDistant"         :   enemyCardContainerDistant,
                    "enemyCardsDeck"                    :   enemyCardsDeck
                };

                this.loaderRes = loaderRes;

                Backbone.on("AllRendered", function(renderer, stage){
                    Backbone.trigger("SetContainerPosition", this.container, stage);
                    this.engineWork(renderer, stage);
                }, this);

                Backbone.trigger("GameRender");
            }

            engineWork(renderer, stage){
                let containerPlayer = {
                    "playersCardsDeck"                  :   this.container.playersCardsDeck,
                    "playersCardContainerDistant"       :   this.container.playersCardContainerDistant,
                    "playersCardContainerInfighting"    :   this.container.playersCardContainerInfighting
                };

                let containerEnemy = {
                    "playersCardsDeck"                  :   this.container.enemyCardsDeck,
                    "playersCardContainerInfighting"    :   this.container.enemyCardContainerInfighting,
                    "playersCardContainerDistant"       :   this.container.enemyCardContainerDistant
                };

                this.player = new Player(this.loaderRes, containerPlayer,
                    stage, renderer);
                this.enemy  = new Bot   (this.loaderRes, containerEnemy,
                    stage, renderer);

                let whoFirst = Math.floor(Math.random() * (2) + 1);
                this.game(whoFirst);

            }

            game(whoFirst){
                if (whoFirst === 1 || whoFirst === 2){
                    this.player.trigger("Act");
                }
                else if (whoFirst === 2){
                    this.enemy.trigger("Act");
                }
            }
        }
        return Engine;
    }
);


"use strict";
define([
        'jquery',
        'underscore',
        'backbone',
        'settings',
        'pixi',
        './player-compiled',
        './bot_player-compiled'
    ], function ($, _, Backbone, Settings, pixi, Player, Bot) {

        let oneLineHeight = $(window).height()/6;
        let width = $(window).width();

        // class completed
        class Container {
            constructor() {

                this.containers = {
                    containerPlayer:                null,
                    containerDistantFighting:       null,
                    containerInfighting:            null,
                    containerEnemyInfighting:       null,
                    containerEnemyDistantFighting:  null,
                    containerEnemy:                 null
                };

                this.stage = new pixi.Container();

                _.forEach(this.containers, function(value, key){
                    this.containers[key] = new pixi.Container();
                    this.stage.addChild(this.containers[key]);
                }, this);

                this.containers.containerInfighting.interactive         = true;
                this.containers.containerInfighting.buttonMode          = true;

                this.containers.containerDistantFighting.interactive    = true;
                this.containers.containerDistantFighting.buttonMode     = true;

                this.containers.containerEnemy.visible = false;

                this.setContainerPosition();

                Backbone.on("CardPressed", function (actionCard) {
                    this.containers.containerInfighting
                        .on('mousedown', function(event){
                            this.onClickBattleField(event, this.containers.containerInfighting, actionCard);
                        }, this);

                    this.containers.containerDistantFighting
                        .on('mousedown', function(event){
                            this.onClickBattleField(event, this.containers.containerDistantFighting, actionCard);

                        }, this);

                }, this);

                Backbone.on("CardAreThrown", function(){
                    this.containers.containerInfighting
                        .off('mousedown');

                    this.containers.containerDistantFighting
                        .off('mousedown');
                }, this);

                Backbone.on("RemoveGapsInDeckForAI", function(container){
                    this.removeGapsInDeck(container);
                }, this);

                this.containers.containerInfighting.hitArea      = new pixi.Rectangle(0, 0, width / 1.5, oneLineHeight);
                this.containers.containerDistantFighting.hitArea = new pixi.Rectangle(0, 0, width / 1.5, oneLineHeight);
            }

            onClickBattleField(event, container, actionCard){
                    actionCard.alpha = 1;
                    actionCard.anchor.set(0);
                    actionCard.x = container.children.length * actionCard.width + 2;
                    actionCard.y = 0;
                    container.addChild(actionCard);
                    for (var i = 0; i < this.containers.containerPlayer.children.length; i+=1){
                        this.containers.containerPlayer.children[i].interactive = true;
                    }
                    this.removeGapsInDeck(this.containers.containerPlayer);
                    Backbone.trigger("CardAreThrown");
                    Backbone.trigger("AIprocess");
            }

            removeGapsInDeck(container) {
                let wid;
                if (container.children.length){
                    wid = container.getChildAt(0).width;
                }
                for (let i = 0; i < container.children.length; i+=1){
                    container.getChildAt(i).x = wid * i + 2 + wid/2;
                }
            }

            // nice work
            setContainerPosition(){
                let i = 4;
                _.forEach(this.containers, function(val, key){
                    this.containers[key].y = 0;
                    this.containers[key].x = 0;
                    this.containers[key].y = i * oneLineHeight;
                    i-=1;
                }, this);
            }
        }


        class Engine {

            constructor(loaderRes) {

                this.container = new Container();
                this.loaderRes = loaderRes;

                Backbone.on("AllRendered", function(renderer){
                    this.engineWork(renderer);
                }, this);

                Backbone.trigger("GameRender", this.container);
            }

            engineWork(renderer){
                this.renderer = renderer;
                this.player = new Player(this.loaderRes, oneLineHeight, this.container.containers.containerPlayer,
                    this.container.stage, this.renderer);
                this.bot    = new Bot   (this.loaderRes, oneLineHeight, this.container.containers.containerEnemy,
                    this.container.containers.containerEnemyDistantFighting, this.container.containers.containerEnemyInfighting,
                    this.container.stage, this.renderer);
            }
        }
        return Engine;
    }
);


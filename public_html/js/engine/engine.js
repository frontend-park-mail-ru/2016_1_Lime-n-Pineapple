"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './player', './bot_player'], function ($, _, Backbone, Settings, pixi, Player, Bot) {

    var oneLineHeight = $(window).height() / 6;
    var width = $(window).width();

    // class completed

    var Container = function () {
        function Container() {
            _classCallCheck(this, Container);

            this.containers = {
                containerPlayer: null,
                containerDistantFighting: null,
                containerInfighting: null,
                containerEnemyInfighting: null,
                containerEnemyDistantFighting: null,
                containerEnemy: null
            };

            this.stage = new pixi.Container();

            _.forEach(this.containers, function (value, key) {
                this.containers[key] = new pixi.Container();
                this.stage.addChild(this.containers[key]);
            }, this);

            this.containers.containerInfighting.interactive = true;
            this.containers.containerInfighting.buttonMode = true;

            this.containers.containerDistantFighting.interactive = true;
            this.containers.containerDistantFighting.buttonMode = true;

            this.containers.containerEnemy.visible = false;

            this.setContainerPosition();

            Backbone.on("CardPressed", function (actionCard, infoCard) {
                this.containers.containerInfighting.on('mousedown', function (event) {
                    this.onClickBattleField(event, this.containers.containerInfighting, actionCard, infoCard);
                }, this);

                this.containers.containerDistantFighting.on('mousedown', function (event) {
                    this.onClickBattleField(event, this.containers.containerDistantFighting, actionCard, infoCard);
                }, this);
            }, this);

            Backbone.on("CardAreThrown CardBackIntoDesc", function () {
                this.containers.containerInfighting.off('mousedown');

                this.containers.containerDistantFighting.off('mousedown');
            }, this);

            Backbone.on("CardMustAddToContainer", function (actionCard, container) {
                actionCard.x = container.children.length * actionCard.width + 2 + actionCard.width / 2;
                actionCard.y = actionCard.height / 2;
                container.addChild(actionCard);

                console.log(container.x, container.y, container.height);
                actionCard.alpha = 1;
                container.visible = true;
                console.log(actionCard.x, actionCard.y);
                console.log(container);
            }, this);

            Backbone.on("RemoveGapsInDeckForAI", function (container) {
                this.removeGapsInDeck(container);
            }, this);

            this.containers.containerInfighting.hitArea = new pixi.Rectangle(0, 0, width / 1.5, oneLineHeight);
            this.containers.containerDistantFighting.hitArea = new pixi.Rectangle(0, 0, width / 1.5, oneLineHeight);
        }

        _createClass(Container, [{
            key: 'onClickBattleField',
            value: function onClickBattleField(event, container, actionCard, infoCard) {
                actionCard.mustX = container.children.length * actionCard.width + 2 + actionCard.width / 2;
                actionCard.mustY = container.y + actionCard.height / 2;
                this.stage.addChild(actionCard);
                actionCard.x = infoCard.x;
                actionCard.y = infoCard.y;
                this.removeGapsInDeck(this.containers.containerPlayer);
                Backbone.trigger("CardAreThrown", actionCard, container);
                Backbone.trigger("AIprocess");
            }
        }, {
            key: 'removeGapsInDeck',
            value: function removeGapsInDeck(container) {
                var wid = void 0;
                if (container.children.length) {
                    wid = container.getChildAt(0).width;
                }
                for (var i = 0; i < container.children.length; i += 1) {
                    container.getChildAt(i).x = wid * i + 2 + wid / 2;
                }
            }

            // nice work

        }, {
            key: 'setContainerPosition',
            value: function setContainerPosition() {
                var i = 4;
                _.forEach(this.containers, function (val, key) {
                    this.containers[key].y = 0;
                    this.containers[key].x = 0;
                    this.containers[key].y = i * oneLineHeight;
                    i -= 1;
                }, this);
            }
        }]);

        return Container;
    }();

    var Engine = function () {
        function Engine(loaderRes) {
            _classCallCheck(this, Engine);

            this.container = new Container();
            this.loaderRes = loaderRes;

            Backbone.on("AllRendered", function (renderer) {
                this.engineWork(renderer);
            }, this);

            Backbone.trigger("GameRender", this.container);
        }

        _createClass(Engine, [{
            key: 'engineWork',
            value: function engineWork(renderer) {
                this.renderer = renderer;
                this.player = new Player(this.loaderRes, oneLineHeight, this.container.containers.containerPlayer, this.container.stage, this.renderer);
                this.bot = new Bot(this.loaderRes, oneLineHeight, this.container.containers.containerEnemy, this.container.containers.containerEnemyDistantFighting, this.container.containers.containerEnemyInfighting, this.container.stage, this.renderer);
            }
        }]);

        return Engine;
    }();

    return Engine;
});

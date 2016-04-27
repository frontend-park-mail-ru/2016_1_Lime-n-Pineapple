"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi'], function ($, _, Backbone, Settings, pixi) {

    var oneLineHeight = $(window).height() / 6;
    var width = $(window).width();

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

            this.containers.containerInfighting.hitArea = new pixi.Rectangle(0, 0, width / 1.5, oneLineHeight);
            this.containers.containerDistantFighting.hitArea = new pixi.Rectangle(0, 0, width / 1.5, oneLineHeight);
        }

        _createClass(Container, [{
            key: 'setContainerPosition',
            value: function setContainerPosition() {
                //this.renderer = pixi.autoDetectRenderer($("#game_window").width()/1.2, $("#game_window").height());
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
        function Engine(loaderRes, playerCollectionCard, enemyCollectionCard) {
            _classCallCheck(this, Engine);

            this.container = new Container();
            this.loaderRes = loaderRes;
            this.playerCollectionCard = playerCollectionCard;
            this.enemyCollectionCard = enemyCollectionCard;
            //this.domID = this.defaults.domID;

            var self = this;
            this.container.containers.containerInfighting.on('mousedown', function (event) {
                self.onClickBattleField(event, self.container.containers.containerInfighting);
            });

            this.container.containers.containerDistantFighting.on('mousedown', function (event) {
                self.onClickBattleField(event, self.container.containers.containerDistantFighting);
            });

            this.createDeck(this.container.containers.containerPlayer, this.playerCollectionCard);
            this.createDeck(this.container.containers.containerEnemy, this.enemyCollectionCard);
            this.setTouchEventCard(this.container.containers.containerPlayer);

            //window.addEventListener('resize', function() {
            //    self.resize(self);
            //});
        }

        _createClass(Engine, [{
            key: 'createDeck',
            value: function createDeck(container, collectionCard) {
                for (var i = 0; i < collectionCard.cardCollection.length; i += 1) {

                    collectionCard.cardCollection[i].cardStrite.x = collectionCard.cardCollection[i].cardStrite.width * i + 2 * i + collectionCard.cardCollection[i].cardStrite.width / 2;
                    collectionCard.cardCollection[i].cardStrite.y = collectionCard.cardCollection[i].cardStrite.y + collectionCard.cardCollection[i].cardStrite.height / 2;
                    collectionCard.cardCollection[i].cardStrite.anchor.set(0.5);
                    container.addChild(collectionCard.cardCollection[i].cardStrite);
                }
            }
        }, {
            key: 'setTouchEventCard',
            value: function setTouchEventCard(container) {
                var self = this;
                if (container.children.length) {
                    var _loop = function _loop(i) {
                        var card = container.getChildAt(i);
                        container.getChildAt(i).on('click', function (event) {
                            console.log(container.children.length);
                            self.onClickCard(event, container, card);
                        }).on('touchstart', function (event) {
                            self.onClickCard(event, container, card);
                        });
                    };

                    for (var i = 0; i < container.children.length; i += 1) {
                        _loop(i);
                    }
                }
            }
        }, {
            key: 'onClickCard',
            value: function onClickCard(event, container, card) {
                console.log(event.data.originalEvent.which);
                switch (event.data.originalEvent.which) {
                    case 1:
                        if (card.alpha === 0.5) {
                            card.alpha = 1;
                            this.infoCard.renderable = false;
                            for (var i = 0; i < container.children.length; i += 1) {
                                container.children[i].interactive = true;
                            }
                        } else {
                            this.infoCard = new pixi.Sprite(card.texture);

                            for (var _i = 0; _i < container.children.length; _i += 1) {
                                container.children[_i].interactive = false;
                            }
                            card.interactive = true;
                            card.alpha = 0.5;
                            this.infoCard.width = card.width * 2.5;
                            this.infoCard.height = card.height * 2.5;
                            this.infoCard.anchor.set(0.5);
                            this.infoCard.x = this.renderer.width - this.infoCard.width / 2;
                            this.infoCard.y = this.infoCard.height / 2;
                            this.infoCard.card = card;
                            this.infoCard.renderable = true;
                            this.stage.addChild(this.infoCard);
                        }
                        break;
                }
            }
        }, {
            key: 'onClickBattleField',
            value: function onClickBattleField(event, container) {
                console.log("in onClickBattleField");
                if (this.infoCard && this.infoCard.renderable) {
                    var card = new pixi.Sprite(this.infoCard.texture);

                    card.width = this.infoCard.width / 2.5;
                    card.height = this.infoCard.height / 2.5;
                    card.anchor.set(0);

                    card.x = container.children.length * card.width + 2;
                    card.y = 0;

                    container.addChild(card);
                    this.infoCard.renderable = false;
                    for (var i = 0; i < this.containers.container.children.length; i++) {
                        this.containers.container.children[i].interactive = true;
                    }
                    this.containers.container.removeChild(this.infoCard.card);
                    this.removeGapsInDeck(this.containers.container);
                    this.AImove();
                }
            }
        }, {
            key: 'removeGapsInDeck',
            value: function removeGapsInDeck(container) {
                var wid = void 0;
                console.log(container.children.length);
                if (container.children.length) {
                    wid = container.getChildAt(0).width;
                }
                for (var i = 0; i < container.children.length; i++) {
                    container.getChildAt(i).x = wid * i + 2 + wid / 2;
                }
            }
        }, {
            key: 'AImove',
            value: function AImove() {
                if (this.containers.containerEnemy.children.length) {
                    var card = this.containers.containerEnemy.getChildAt(Math.floor(Math.random() * this.containers.containerEnemy.children.length));
                    this.containers.containerEnemy.removeChild(card);
                    var r = Math.floor(Math.random() * 2 + 1);
                    if (r == 1) {
                        this.containers.containerEnemyDistantFighting.addChild(card);
                        this.removeGapsInDeck(this.containers.containerEnemyDistantFighting);
                    } else {
                        this.containers.containerEnemyInfighting.addChild(card);
                        this.removeGapsInDeck(this.containers.containerEnemyInfighting);
                    }
                }
            }
        }]);

        return Engine;
    }();

    return Engine;
});

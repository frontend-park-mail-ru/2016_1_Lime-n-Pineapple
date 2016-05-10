"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './Settings'], function ($, _, Backbone, Settings, pixi, SETTING) {
    var CardContainerView = function () {
        function CardContainerView(interactive, buttonMode) {
            var visible = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

            _classCallCheck(this, CardContainerView);

            _.extend(this, Backbone.Events);

            this.containerView = new pixi.Container();
            this.containerView.interactive = interactive;
            this.containerView.buttonMode = buttonMode;
            this.containerView.visible = visible;

            this.graphics = [];

            this.on("RemoveGapsInContainer", function () {
                this.removeGapsInDeck();
            }, this);

            this.on("AddChild", function (sprite) {
                this.containerView.addChild(sprite);
            }, this);
        }

        _createClass(CardContainerView, [{
            key: 'setClickEventsListener',
            value: function setClickEventsListener(card, infoCard, containerModel) {
                this.containerView.on('click', function () {
                    this.onClickContainer(card, infoCard, containerModel);
                }, this);
            }
        }, {
            key: 'cleanClickEventsListener',
            value: function cleanClickEventsListener() {
                this.containerView.off('click');
            }
        }, {
            key: 'onClickContainer',
            value: function onClickContainer(card, infoCard, containerModel) {
                infoCard.trigger("InfoCardModel::AddToBattlesContainer", card, containerModel);
            }
        }, {
            key: 'edgingVisible',
            value: function edgingVisible(value) {
                this.graphics[0].visible = value;
                this.containerView.off('mouseover');
                this.containerView.off('mouseout');
            }
        }, {
            key: 'edgingEventsSetter',
            value: function edgingEventsSetter(graph, isListen) {
                if (isListen) {
                    this.containerView.on('mouseover', function () {
                        this.visible = true;
                    }, graph);
                    this.containerView.on('mouseout', function () {
                        this.visible = false;
                    }, graph);
                } else {
                    this.containerView.off('mouseover');
                    this.containerView.off('mouseout');
                }
            }
        }, {
            key: 'addChildToContainer',
            value: function addChildToContainer(child, x, y) {
                this.containerView.addChild(child);
                child.x = x;
                child.y = y;
            }
        }, {
            key: 'removeGapsInDeck',
            value: function removeGapsInDeck(cardCollection) {
                var wid = void 0;
                if (cardCollection.length) {
                    wid = cardCollection[0].cardView.sprite.width;
                }
                for (var i = 0; i < cardCollection.length; i += 1) {
                    cardCollection[i].cardView.sprite.x = wid * i + 2 + wid / 2;
                }
            }
        }, {
            key: 'createHitArea',
            value: function createHitArea(width, height) {
                this.containerView.hitArea = new pixi.Rectangle(0, 0, width, height);
            }
        }, {
            key: 'createGraphicsEdging',
            value: function createGraphicsEdging(width, height) {
                var worldVisible = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
                var x = arguments.length <= 3 || arguments[3] === undefined ? 3 : arguments[3];
                var y = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

                var graph = new pixi.Graphics();
                this.graphics.push(graph);
                this.containerView.addChild(graph);
                graph.beginFill(0xffae80, 0.15);
                graph.lineStyle(3, 0xff8e4d, 0.3);
                graph.drawRect(x, y, width, height);
                graph.visible = false;
                graph.myWorldVisible = worldVisible;
                if (graph.myWorldVisible) {
                    this.edgingEventsSetter(graph, true);
                }
            }
        }, {
            key: 'setContainerPosition',
            value: function setContainerPosition(container, x, y) {
                container.addChild(this.containerView);
                this.containerView.x = x;
                this.containerView.y = y;
            }
        }, {
            key: 'createPlayersDeck',
            value: function createPlayersDeck(cardCollection) {
                var sprite = void 0;
                for (var i = 0; i < cardCollection.length; i += 1) {
                    sprite = cardCollection[i].cardView.sprite;
                    sprite.x = sprite.width * i + 3 + sprite.width / 2;
                    sprite.y = sprite.y + sprite.height / 2;
                    sprite.anchor.set(0.5);
                    this.containerView.addChild(sprite);
                }
            }
        }, {
            key: 'setPositionInContainer',
            value: function setPositionInContainer(object, x, y) {
                object.x = x;
                object.y = y;
                object.anchor.set(0.5);
                this.containerView.addChild(object);
            }
        }]);

        return CardContainerView;
    }();

    return CardContainerView;
});

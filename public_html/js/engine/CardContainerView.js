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
            value: function setClickEventsListener(card) {
                this.containerView.on('click', function () {
                    this.onClickContainer(card);
                }, this);
            }
        }, {
            key: 'cleanClickEventsListener',
            value: function cleanClickEventsListener() {
                this.containerView.off('click');
            }
        }, {
            key: 'onClickContainer',
            value: function onClickContainer(card) {}
        }, {
            key: 'edgingVisible',
            value: function edgingVisible(value) {
                this.graphics[0].visible = value;
                this.containerView.off('mouseover');
                this.containerView.off('mouseout');
            }
        }, {
            key: 'edgingEventsSetter',
            value: function edgingEventsSetter() {
                this.containerView.on('mouseover', function () {
                    this.visible = true;
                }, this.graphics[0]);
                this.containerView.on('mouseout', function () {
                    this.visible = false;
                }, this.graphics[0]);
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
            value: function removeGapsInDeck() {
                var wid = void 0;
                if (this.containerView.children.length) {
                    wid = this.containerView.getChildAt(0).width;
                }
                for (var i = 0; i < this.containerView.children.length; i += 1) {
                    this.containerView.getChildAt(i).x = wid * i + 2 + wid / 2;
                }
            }
        }, {
            key: 'createHitArea',
            value: function createHitArea(width, height) {
                if (this.containerView.interactive && this.containerView.buttonMode) {
                    this.containerView.hitArea = new pixi.Rectangle(0, 0, width, height);
                }
            }
        }, {
            key: 'createGraphicsEdging',
            value: function createGraphicsEdging(width, height) {
                var worldVisible = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];
                var x = arguments.length <= 3 || arguments[3] === undefined ? 3 : arguments[3];
                var y = arguments.length <= 4 || arguments[4] === undefined ? 0 : arguments[4];

                var graphic = new pixi.Graphics();
                this.graphics.push(graphic);
                this.containerView.addChild(graphic);
                graphic.beginFill(0xffae80, 0.15);
                graphic.lineStyle(3, 0xff8e4d, 0.3);
                graphic.drawRect(x, y, width, height);
                graphic.visible = false;
                graphic.myWorldVisible = worldVisible;
                if (graphic.myWorldVisible) {
                    this.edgingEventsSetter();
                }
            }
        }]);

        return CardContainerView;
    }();

    return CardContainerView;
});

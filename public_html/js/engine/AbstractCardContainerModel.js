"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi'], function ($, _, Backbone, Settings, pixi) {

    var oneLineHeight = $(window).height() / 6;

    var AbstractCardContainerModel = function () {
        function AbstractCardContainerModel(cardContainerView) {
            _classCallCheck(this, AbstractCardContainerModel);

            _.extend(this, Backbone.Events);

            this.containerView = cardContainerView;
            this.graphics = new pixi.Graphics();

            this.on("CardPressed", function () {
                this.containerView.on("mousedown", function () {}, this);
            }, this);

            this.on("CardAreThrown CardBackIntoDesc", function () {
                this.containerView.off("mousedown");
            }, this);

            this.on("RemoveGapsInDeck", function () {
                this.containerView.trigger("RemoveGapsInContainer");
            }, this);

            this.on("AbstractCardContainer::SetContainerPosition", function (arrContainer, stage) {
                AbstractCardContainerModel.setContainerPosition(arrContainer, stage, oneLineHeight);
            });

            this.containerView.containerView.on('mouseover', function (event) {
                this.cardWidth = 0;
                this.graphics.visible = true;
                if (!this.graphics.parent) {
                    Backbone.trigger("PlayerCardsDeck::GetCardsWidth", this.getCardsWidth.bind(this));
                    this.containerView.containerView.addChild(this.graphics);
                    this.containerView.containerView.swapChildren(this.containerView.containerView.getChildAt(0), this.graphics);
                    this.width = this.cardWidth * 8 + 14;
                    if (this.containerView.containerView.visible) {
                        delete this.containerView.containerView.hitArea;
                        this.containerView.containerView.hitArea = new pixi.Rectangle(0, 0, this.width, oneLineHeight);
                    }
                    this.graphics.beginFill(0xffae80, 0.15);

                    this.graphics.lineStyle(3, 0xff8e4d, 0.3);
                    this.graphics.moveTo(3, 0);
                    this.graphics.lineTo(3, oneLineHeight);
                    this.graphics.lineTo(this.width, oneLineHeight);
                    this.graphics.lineTo(this.width, 0);
                    this.graphics.lineTo(3, 0);
                }
            }, this);
            this.containerView.containerView.on('mouseout', function (event) {
                this.graphics.visible = false;
            }, this);
        }

        _createClass(AbstractCardContainerModel, [{
            key: 'getCardsWidth',
            value: function getCardsWidth(width) {
                this.cardWidth = width;
            }

            // nice work

        }], [{
            key: 'setContainerPosition',
            value: function setContainerPosition(arrContainer, stage, oneLineHeight) {
                var i = 4;
                _.forEach(arrContainer, function (value, key) {
                    stage.addChild(arrContainer[key].containerView.containerView);
                    arrContainer[key].containerView.containerView.y = 0;
                    arrContainer[key].containerView.containerView.x = 0;
                    arrContainer[key].containerView.containerView.y = i * oneLineHeight;
                    i -= 1;
                });
            }
        }]);

        return AbstractCardContainerModel;
    }();

    return AbstractCardContainerModel;
});

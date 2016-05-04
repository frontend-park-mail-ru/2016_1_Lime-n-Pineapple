"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi'], function ($, _, Backbone, Settings, pixi) {

    var oneLineHeight = $(window).height() / 6;
    var width = $(window).width();

    var CardContainerView = function () {
        function CardContainerView(interactive, buttonMode) {
            _classCallCheck(this, CardContainerView);

            _.extend(this, Backbone.Events);

            this.containerView = new pixi.Container();
            this.containerView.interactive = interactive;
            this.containerView.buttonMode = buttonMode;

            if (interactive && buttonMode) {
                this.containerView.hitArea = new pixi.Rectangle(0, 0, width / 1.5, oneLineHeight);
            }

            this.on("RemoveGapsInContainer", function () {
                this.removeGapsInDeck();
            }, this);

            this.on("AddChild", function (sprite) {
                this.containerView.addChild(sprite);
            }, this);
        }

        _createClass(CardContainerView, [{
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
        }]);

        return CardContainerView;
    }();

    return CardContainerView;
});

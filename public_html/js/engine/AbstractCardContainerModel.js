"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi'], function ($, _, Backbone, Settings, pixi) {

    var oneLineHeight = $(window).height() / 6;
    var width = $(window).width();

    var AbstractCardContainerModel = function () {
        function AbstractCardContainerModel(cardContainerView) {
            _classCallCheck(this, AbstractCardContainerModel);

            _.extend(this, Backbone.Events);

            this.containerView = cardContainerView;

            //this.setContainerPosition();

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
        }

        // nice work


        _createClass(AbstractCardContainerModel, null, [{
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

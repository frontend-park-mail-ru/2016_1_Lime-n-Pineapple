"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './AbstractCardContainerModel'], function ($, _, Backbone, Settings, pixi, AbstractCardContainerModel) {

    var oneLineHeight = $(window).height() / 6;
    var width = $(window).width();

    var PlayerCardsDeck = function (_AbstractCardContaine) {
        _inherits(PlayerCardsDeck, _AbstractCardContaine);

        function PlayerCardsDeck(cardContainerView) {
            _classCallCheck(this, PlayerCardsDeck);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PlayerCardsDeck).call(this, cardContainerView));

            _this.on("CreatePlayersDeck", function (cardCollection) {
                this.cardCollection = cardCollection;
                this.createCardDeck();
            }, _this);

            //this.container = cardContainerView;
            //this.stage = new pixi.Container();
            //
            //_.forEach(this.containers, function (value, key) {
            //    this.containers[key] = new pixi.Container();
            //    this.stage.addChild(this.containers[key]);
            //}, this);

            //Backbone.on("CardMustAddToContainer", function (actionCard, container) {
            //    actionCard.x = container.children.length * actionCard.width + 2 + actionCard.width / 2;
            //    actionCard.y = actionCard.height / 2;
            //    container.addChild(actionCard);
            //
            //    console.log(container.x, container.y, container.height);
            //    actionCard.alpha = 1;
            //    container.visible = true;
            //    console.log(actionCard.x, actionCard.y);
            //    console.log(container);
            //}, this);

            return _this;
        }

        _createClass(PlayerCardsDeck, [{
            key: 'createCardDeck',
            value: function createCardDeck() {
                this.cardCollection.trigger("SetPositionInDeck", this.containerView);
            }

            //onClickBattleField(event, container, actionCard, infoCard) {
            //    actionCard.mustX = container.children.length * actionCard.width + 2 + actionCard.width / 2;
            //    actionCard.mustY = container.y + actionCard.height / 2;
            //    this.stage.addChild(actionCard);
            //    actionCard.x = infoCard.x;
            //    actionCard.y = infoCard.y;
            //    this.removeGapsInDeck(this.containers.containerPlayer);
            //    Backbone.trigger("CardAreThrown", actionCard, container);
            //    Backbone.trigger("AIprocess");
            //}

        }]);

        return PlayerCardsDeck;
    }(AbstractCardContainerModel);

    return PlayerCardsDeck;
});

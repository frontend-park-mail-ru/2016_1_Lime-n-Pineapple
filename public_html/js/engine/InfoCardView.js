"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

define(['backbone', 'underscore', 'pixi', './CardsScenario'], function (Backbone, _, pixi, CardScenario) {
    var InfoCardView = function (_CardScenario) {
        _inherits(InfoCardView, _CardScenario);

        function InfoCardView(card) {
            _classCallCheck(this, InfoCardView);

            var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(InfoCardView).call(this));

            _this.infoCard = new pixi.Sprite(card.texture);
            _this.infoCard.width = card.sprite.width * 2;
            _this.infoCard.height = card.sprite.height * 2;
            _this.infoCard.anchor.set(0.5);
            card.sprite.parent.parent.trigger("AddChildToStage", _this.infoCard);
            _this.infoCard.x = card.sprite.x;
            _this.infoCard.y = card.sprite.parent.y;
            _this.infoCard.mustX = card.sprite.parent.parent.width + _this.infoCard.width / 2;
            _this.infoCard.mustY = _this.infoCard.height / 2;
            _this.infoCard.deltaX = _this.infoCard.mustX - _this.infoCard.x;
            _this.infoCard.deltaY = _this.infoCard.mustY - _this.infoCard.y;
            _this.infoCard.rateX = _this.infoCard.deltaX / 10;
            _this.infoCard.rateY = _this.infoCard.deltaY / 10;

            Backbone.trigger("render::renderAnimation", _this.moveCard.bind(_this), _this.infoCard);
            //this.moveCard(this.infoCard);

            //_.extend(this, Backbone.Events);

            return _this;
        }

        //moveCard(card){
        //    card.x+=card.rateX;
        //    card.y+=card.rateY;
        //    if (Math.abs(card.x - card.mustX) < 10 && Math.abs(card.y - card.mustY) < 10){
        //        this.trigger("CardMoved");
        //    }
        //}

        return InfoCardView;
    }(CardScenario);

    return InfoCardView;
});

"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone', 'underscore', 'pixi', './CardView'], function (Backbone, _, pixi, CardView) {
    var Card = function Card(loaderRes) {
        _classCallCheck(this, Card);

        _.extend(this, Backbone.Events);
        this.cardView = new CardView(loaderRes);

        this.on("CardModel::SetTouchEventCard", function (player) {
            this.cardView.setTouchEventCard(this);
            this.playerOwner = player;
        }, this).on("CardModel::CardViewPressed", function () {
            this.playerOwner.trigger("AbstractPlayer::MustCreateInfoCard", this);
        }, this).on("CardModel::InfoCardBackToDeck", function () {
            this.playerOwner.trigger("AbstractPlayer::InfoCardBackToDeck", this);
        }, this).on("AbstractCardModel::ShowInfoBattleCard", function () {
            this.playerOwner.trigger("AbstractPlayer::ShowBattlesInfoCard", this);
        }, this).on("AbstractCardModel::ChangeClickListener", function () {
            this.cardView.changeClickListenerToBattleFieldListener(this);
        }, this).on("CardModel::CleanClickEventCard", function () {
            this.cardView.cleanClickEventCard();
        }, this).on("CardModel::SetClickEventCard", function () {
            this.cardView.setClickEventCard(this);
        }, this).on("AbstractCardModel::CreateBattlesInfoCard", function () {
            this.cardView.createBattlesInfoCard(this.playerOwner);
        }, this);
    };

    return Card;
});

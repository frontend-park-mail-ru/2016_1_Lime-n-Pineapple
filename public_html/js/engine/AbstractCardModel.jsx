"use strict";
define([
        'backbone',
        'underscore',
        'pixi',
        './CardView',
        './EventsConfig'
    ],
    function (Backbone, _, pixi, CardView, Events) {
        class Card{
            constructor(loaderRes) {
                _.extend(this, Backbone.Events);
                this.cardView = new CardView(loaderRes);

                this
                    .on("CardModel::SetTouchEventCard", function (player) {
                        this.cardView.setTouchEventCard(this);
                        this.playerOwner = player;
                    }, this)
                    .on("CardModel::CardViewPressed", function(){
                        this.playerOwner.trigger(Events.Game.AbstractPlayer.MustCreateInfoCard, this);
                    }, this)
                    .on("CardModel::InfoCardBackToDeck", function(){
                        this.playerOwner.trigger(Events.Game.AbstractPlayer.InfoCardBackToDeck, this);
                    }, this)
                    .on("AbstractCardModel::ShowInfoBattleCard", function () {
                        this.playerOwner.trigger(Events.Game.AbstractPlayer.ShowBattlesInfoCard, this);
                    }, this)
                    .on(Events.Game.AbstractCardModel.ChangeClickListener, function () {
                        this.cardView.changeClickListenerToBattleFieldListener(this);
                    }, this)
                    .on(Events.Game.CardModel.CleanClickEventCard, function () {
                        this.cardView.cleanClickEventCard();
                    }, this)
                    .on("CardModel::SetClickEventCard", function () {
                        this.cardView.setClickEventCard(this);
                    }, this)
                    .on(Events.Game.AbstractCardModel.CreateBattlesInfoCard, function () {
                        this.cardView.createBattlesInfoCard(this.playerOwner);
                    }, this);

            }
        }
        return Card;
    }
);


"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'pixi', './player', './bot_player', './CardContainerModel', './CardContainerView', './player_cards_deck', './Settings'], function ($, _, Backbone, pixi, Player, Bot, CardContainerModel, CardContainerView, PlayerCardsDeck, SETTINGS) {
    var Engine = function () {
        function Engine(loaderRes) {
            _classCallCheck(this, Engine);

            var playerCardsDeckView = new CardContainerView(true, true),
                playerCardsDeck = new PlayerCardsDeck(playerCardsDeckView),
                playersCardContainerMeleeView = new CardContainerView(true, true),
                playersCardContainerMelee = new CardContainerModel(playersCardContainerMeleeView),
                playersCardContainerDistantView = new CardContainerView(true, true),
                playersCardContainerDistant = new CardContainerModel(playersCardContainerDistantView),
                playersContainerBossView = new CardContainerView(true, true),
                playersContainerBoss = new CardContainerModel(playersContainerBossView),
                playersContainerBossCardView = new CardContainerView(true, true),
                playersContainerBossCard = new CardContainerModel(playersContainerBossCardView),
                enemyCardsDeckView = new CardContainerView(false, false, false),
                enemyCardsDeck = new PlayerCardsDeck(enemyCardsDeckView),
                enemyCardContainerMeleeView = new CardContainerView(true, true),
                enemyCardContainerMelee = new CardContainerModel(enemyCardContainerMeleeView),
                enemyCardContainerDistantView = new CardContainerView(true, true),
                enemyCardContainerDistant = new CardContainerModel(enemyCardContainerDistantView),
                enemyContainerBossView = new CardContainerView(true, true),
                enemyContainerBoss = new CardContainerModel(enemyContainerBossView),
                enemyContainerBossCardView = new CardContainerView(true, true),
                enemyContainerBossCard = new CardContainerModel(enemyContainerBossCardView);

            var playersInfoCardContainerView = new CardContainerView(false, false),
                playersInfoCardContainer = new CardContainerModel(playersInfoCardContainerView);

            this.container = {
                "playersCardsDeck": playerCardsDeck,
                "playersCardContainerDistant": playersCardContainerDistant,
                "playersCardContainerMelee": playersCardContainerMelee,
                "enemyCardContainerMelee": enemyCardContainerMelee,
                "enemyCardContainerDistant": enemyCardContainerDistant,
                "enemyCardsDeck": enemyCardsDeck,
                "playersContainerBoss": playersContainerBoss,
                "enemyContainerBoss": enemyContainerBoss,
                "playersContainerBossCard": playersContainerBossCard,
                "enemyContainerBossCard": enemyContainerBossCard,
                "playersInfoCardContainer": playersInfoCardContainer
            };

            this.loaderRes = loaderRes;

            Backbone.on("AllRendered", function (stage) {
                this.battlesContainer = {
                    "playersCardsDeck": playerCardsDeck,
                    "playersCardContainerDistant": playersCardContainerDistant,
                    "playersCardContainerMelee": playersCardContainerMelee,
                    "enemyCardContainerMelee": enemyCardContainerMelee,
                    "enemyCardContainerDistant": enemyCardContainerDistant,
                    "enemyCardsDeck": enemyCardsDeck
                };
                var i = 4;
                _.forEach(this.battlesContainer, function (value, key, iter) {
                    iter[key].trigger("AbstractCardContainerModel::SetContainerPosition", stage, SETTINGS.battleContainerPositionX, i * SETTINGS.oneLineHeight);
                    $(iter[key]).trigger("AbstractCardContainerModel::CreateGraphics", [SETTINGS.deckWidth, SETTINGS.oneLineHeight]);
                    i -= 1;
                }, this);
                this.container.playersContainerBoss.trigger("AbstractCardContainerModel::SetContainerPosition", stage, 10, 3 * SETTINGS.oneLineHeight);
                $(this.container.playersContainerBoss).trigger("AbstractCardContainerModel::CreateGraphics", [SETTINGS.battleContainerPositionX - 10, SETTINGS.oneLineHeight, false]);
                this.container.playersContainerBossCard.trigger("AbstractCardContainerModel::SetContainerPosition", this.container.playersContainerBoss.containerView.containerView, 0, 0);
                $(this.container.playersContainerBossCard).trigger("AbstractCardContainerModel::CreateGraphics", [SETTINGS.cardWidth, SETTINGS.oneLineHeight]);

                this.container.enemyContainerBoss.trigger("AbstractCardContainerModel::SetContainerPosition", stage, 10, 0);
                $(this.container.enemyContainerBoss).trigger("AbstractCardContainerModel::CreateGraphics", [SETTINGS.battleContainerPositionX - 10, SETTINGS.oneLineHeight, false]);
                this.container.enemyContainerBossCard.trigger("AbstractCardContainerModel::SetContainerPosition", this.container.enemyContainerBoss.containerView.containerView, 0, 0);
                $(this.container.enemyContainerBossCard).trigger("AbstractCardContainerModel::CreateGraphics", [SETTINGS.cardWidth, SETTINGS.oneLineHeight]);

                this.container.playersInfoCardContainer.trigger("AbstractCardContainerModel::SetContainerPosition", stage, SETTINGS.infoCardContainerPositionX, 2 * SETTINGS.oneLineHeight);

                this.engineWork();
            }, this);

            Backbone.trigger("GameRender");
        }

        _createClass(Engine, [{
            key: 'engineWork',
            value: function engineWork() {
                var containerPlayer = {
                    "playersCardsDeck": this.container.playersCardsDeck,
                    "playersCardContainerDistant": this.container.playersCardContainerDistant,
                    "playersCardContainerMelee": this.container.playersCardContainerMelee,
                    "playersContainerBoss": this.container.playersContainerBoss,
                    "playersContainerBossCard": this.container.playersContainerBossCard,
                    "playersInfoCardContainer": this.container.playersInfoCardContainer,
                    "enemyCardContainerMelee": this.container.enemyCardContainerMelee,
                    "enemyCardContainerDistant": this.container.enemyCardContainerDistant
                };

                var containerEnemy = {
                    "playersCardsDeck": this.container.enemyCardsDeck,
                    "playersCardContainerMelee": this.container.enemyCardContainerMelee,
                    "playersCardContainerDistant": this.container.enemyCardContainerDistant,
                    "playersContainerBoss": this.container.enemyContainerBoss,
                    "playersContainerBossCard": this.container.enemyContainerBossCard,
                    "playersInfoCardContainer": this.container.playersInfoCardContainer,
                    "enemyCardContainerDistant": this.container.playersCardContainerDistant,
                    "enemyCardContainerMelee": this.container.playersCardContainerMelee
                };

                this.player = new Player(this.loaderRes, containerPlayer);
                this.enemy = new Bot(this.loaderRes, containerEnemy);

                var whoFirst = Math.floor(Math.random() * 2 + 1);
                this.game(whoFirst);
            }
        }, {
            key: 'game',
            value: function game(whoFirst) {
                if (whoFirst === 1 || whoFirst === 2) {
                    this.player.trigger("AbstractPlayer::Act");
                } else if (whoFirst === 2) {
                    this.enemy.trigger("AbstractPlayer::Act");
                }
            }
        }]);

        return Engine;
    }();

    return Engine;
});

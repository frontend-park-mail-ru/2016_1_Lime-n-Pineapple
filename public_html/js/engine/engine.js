"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi', './player', './bot_player', './CardContainerModel', './CardContainerView', './player_cards_deck'], function ($, _, Backbone, Settings, pixi, Player, Bot, CardContainerModel, CardContainerView, PlayerCardsDeck) {
    var Engine = function () {
        function Engine(loaderRes) {
            _classCallCheck(this, Engine);

            var playerCardsDeckView = new CardContainerView(true, true),
                playerCardsDeck = new PlayerCardsDeck(playerCardsDeckView),
                playersCardContainerMeleeView = new CardContainerView(true, true),
                playersCardContainerMelee = new CardContainerModel(playersCardContainerMeleeView),
                playersCardContainerDistantView = new CardContainerView(true, true),
                playersCardContainerDistant = new CardContainerModel(playersCardContainerDistantView),
                enemyCardsDeckView = new CardContainerView(false, false, false),
                enemyCardsDeck = new PlayerCardsDeck(enemyCardsDeckView),
                enemyCardContainerMeleeView = new CardContainerView(true, true),
                enemyCardContainerMelee = new CardContainerModel(enemyCardContainerMeleeView),
                enemyCardContainerDistantView = new CardContainerView(true, true),
                enemyCardContainerDistant = new CardContainerModel(enemyCardContainerDistantView);

            this.container = {
                "playersCardsDeck": playerCardsDeck,
                "playersCardContainerDistant": playersCardContainerDistant,
                "playersCardContainerMelee": playersCardContainerMelee,
                "enemyCardContainerMelee": enemyCardContainerMelee,
                "enemyCardContainerDistant": enemyCardContainerDistant,
                "enemyCardsDeck": enemyCardsDeck
            };

            this.loaderRes = loaderRes;

            Backbone.on("AllRendered", function (stage) {
                this.container.playersCardsDeck.trigger("AbstractCardContainer::SetContainerPosition", this.container, stage);
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
                    "playersCardContainerMelee": this.container.playersCardContainerMelee
                };

                var containerEnemy = {
                    "playersCardsDeck": this.container.enemyCardsDeck,
                    "playersCardContainerMelee": this.container.enemyCardContainerMelee,
                    "playersCardContainerDistant": this.container.enemyCardContainerDistant
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

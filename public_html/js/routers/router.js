define([
        'underscore',
        'backbone',
        'views/main',
        'views/scoreboard',
        'views/game',
        'views/login',
        'views/block/btn_back'
    ], function(_,Backbone,Main,Scoreboard, GameAction, Login, Btn_Back) {
        var Router = Backbone.Router.extend({
            routes: {
                "game": "gameAction",
                "scoreboard": "scoreboardAction",
                "login": "loginAction",
                "*default": "defaultAction"
            },

            initialize: function(){
                console.log("render back button");
                this.btn_back = new Btn_Back();
                this.btn_back.render();
                this.btn_back.$el.appendTo($("#view__btn_back"));
                this.btn_back.on("back", function(){
                    console.log("btn_back on");
                    Backbone.history.history.back();
                }, this);
                this.defaultAction();
            },

            defaultAction: function(){
                this.main = new Main();
                this.main.show();
                this.btn_back.hide();
                console.log(this.main.$el + "defaultAction, changed to main");
            },

            scoreboardAction: function () {
                this.scoreboard = new Scoreboard();
                this.scoreboard.show();
                this.btn_back.show();
                console.log("scoreboardAction, Changed to scoreboard");
            },

            gameAction: function () {
                this.game = new GameAction();
                this.game.show();
                console.log(this.game.$el + "gameAction, changed to game");
            },

            loginAction: function () {
                this.login = new Login();
                this.login.show();
                console.log(this.login.$el + "loginAction, changed to login")
            },

        });
        return new Router();
    }

);
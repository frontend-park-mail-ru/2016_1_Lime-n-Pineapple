define([
    'jquery',
    'underscore',
    'backbone',
    'views/main',
    'views/scoreboard',
    'views/game',
    'views/login',
    'views/block/btn_back'
], function($, underscore,Backbone,Main,Scoreboard, GameAction, Login, BtnBack) {
        var Router = Backbone.Router.extend({
            routes: {
                "game": "gameAction",
                "scoreboard": "scoreboardAction",
                "login": "loginAction",
                "*default": "defaultAction"
            },

            _createView: function (ViewClass, viewName){
                var view = this[viewName];
                if(this[viewName] === undefined) {
                    view = this[viewName] = new ViewClass();
                    view.render();
                }
                return view;
            },

            _allHide: function() {
                if(this.scoreboard) {
                    this.scoreboard.hide();
                }
                if (this.main) {
                    this.main.hide();
                }
                if (this.btnBack) {
                    this.btnBack.hide();
                }
                if (this.login) {
                    this.login.hide();
                }
                if (this.game){
                    this.game.hide();
                }
            },


            initialize: function(){
                console.log("initialize in router");
                this._createView(BtnBack,"btnBack");
                // this["btn_back"] ==== this.btn_back !=== this."btn_back"
                this.defaultAction();
            },

            defaultAction: function () {
                this._createView(Main, "main");
                this._allHide();
                this.main.show();
                console.log(this.main.$el, "defaultAction, changed to main");

            },

            scoreboardAction: function () {
                this._allHide();
                this._createView(Scoreboard, "scoreboard");
                this.scoreboard.show();
                this.btnBack.show();
                console.log("scoreboardAction, Changed to scoreboard");
            },

            gameAction: function () {
                this._allHide();
                this._createView(GameAction, "game");
                this.game.show();
                this.btnBack.show();
                console.log(this.game.$el, "gameAction, changed to game");
            },

            loginAction: function () {
                this._allHide();
                this._createView(Login, "login");
                this.login.show();
                this.btnBack.show();
                console.log(this.login.$el + "loginAction, changed to login");
            }

        });
        return new Router();
    }

);
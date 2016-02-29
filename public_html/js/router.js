define([
    'underscore',
    'backbone',
    'views/main',
    'views/scoreboard'
], function(_,Backbone,Main,Scoreboard) {
        var Router = Backbone.Router.extend({
            routes: {
                "init": "initAction",
                "game": "gameAction",
                "scoreboard": "scoreboardAction",
                "login": "loginAction",
                "project/:slug": "project",
                "*default": "defaultAction"
            },

            initialize: function(){
                this.defaultAction();
            },

            initAction: function(){
                Main.render();
                console.log();
            },

            defaultAction: function(){
                //this.view = new Main();
                //$(".view__main").html(this.view.render().el);
                Main.render();
                console.log("lalaka");

            },

            scoreboardAction: function () {
                //this.view = new Scoreboard();
                //$(".view__scoreboard").html(this.view.render().el);
                Scoreboard.render();
            },

            gameAction: function () {
            //    TODO
            },

            loginAction: function () {
                // TODO
            },

            project: function(slug) {
                alert("LALKA \r\n" + slug);
            },


        });
        return new Router();
    }

);
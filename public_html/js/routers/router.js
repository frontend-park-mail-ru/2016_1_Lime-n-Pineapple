"use strict";

define([
    'underscore',
    'jquery',
    'backbone',
    'views/main',
    'views/game',
    'views/scoreboard',
    'views/login'
], /*function(
    Backbone
){

    var Router = Backbone.Router.extend({
        routes: {
            'scoreboard': 'scoreboardAction',
            'game': 'gameAction',
            'login': 'loginAction',
            '*default': 'defaultActions'
        },
        defaultActions: function () {
            // TODO
        },
        scoreboardAction: function () {
            // TODO
        },
        gameAction: function () {
            // TODO
        },
        loginAction: function () {
            // TODO
        }
    });

    return new Router();
} */
    function (_, $, Backbone, mv, gv, sv, lv) {
        var Controller = Backbone.Router.extend({
            routes: {
                "lolka": 'startAction',
                //"scoreboard": 'scoreboardAction',
                //"login": "loginAction",
                //"game": 'gameAction',
                //"*default": 'generalAction',
                "project/:slug": 'project'
            },
            startAction: function () {
                mv.render();
            },
            start: function () {
                $(".block").hide(); // Прячем все блоки
                $("#start").show(); // Показываем нужный
            },

            success: function () {
                $(".block").hide();
                $("#success").show();
            },

            error: function () {
                $(".block").hide();
                $("#error").show();
            },
            project: function (slug) {
                alert("LALKA \r\n" + slug);
            }
        });
        return new Controller();
    }

    );
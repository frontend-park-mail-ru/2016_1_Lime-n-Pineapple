define([
    'underscore',
    'backbone'
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
    function(_,Backbone) {
        var Controller = Backbone.Router.extend({
            routes: {
                "": "start", // Пустой hash-тэг
                "!/": "start", // Начальная страница
                "!/success": "success", // Блок удачи
                "!/error": "error", // Блок ошибки
                "!/project/:slug": "project",
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
            project: function(slug) {
                alert("LALKA \r\n" + slug);
            },
        });
        return new Controller();
    }

);
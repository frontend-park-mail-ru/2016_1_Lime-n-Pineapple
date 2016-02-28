require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define([
    'underscore',
    'backbone',
    'router',
    'tmpl/main_page'
], function(
    _,
    Backbone,
    router,
    tmpl
){
    /**
     * Created by Raaw on 28-Feb-16.
     */
    var Start = Backbone.View.extend({
        className: "view__main",
        template: tmpl,
        el: $(".view__main"), // DOM элемент widget'а
        events: {
            "click input:button": "check" // Обработчик клика на кнопке "Проверить"
        },
        initialize: function() {

        },
        check: function () {
            if (this.$el.find("input:text").val() == "test") // Проверка текста
                router.navigate("!/success", {trigger: true}); // переход на страницу success
            else
                router.navigate("!/error", {trigger: true}); // переход на страницу error
        },
        render: function () {
            $(this.el).html(this.template({}));
            return this;
        }
    });

    Backbone.history.start({

    });  // Запускаем HTML5 History push

    var start = new Start(); // Singletone?
    start.render();
});

/*global define*/
define([
    'underscore',
    'backbone',
    '../routers/router',
    //'common',
    'tmpl/main_page'
], function (
    _,
    Backbone,
    router,
    tmpl
) {
    "use strict";
    /**
     * Created by Raaw on 28-Feb-16.
     */
    var className = "view__main",
        MainView = Backbone.View.extend({
            className: "view__main",
            template: tmpl,
            events: {
                "click input:button": "check", // Обработчик клика на кнопке "Проверить"
                "keypress": "_checkOnEnterKey"
            },
            initialize: function () {

            },
            _checkOnEnterKey: function (e, keycode) {
                if (keycode === 13) {
                    this.check();
                }
            },
            check: function () {
                if (this.$el.find("input:text").val() === "test") {
                    router.navigate("!/success", {trigger: true}); // переход на страницу success
                } else {
                    router.navigate("!/error", {trigger: true}); // переход на страницу error
                }
            },
            render: function () {
                this.$el.html("FUCK YOU!!!!!!!");
                console.log(this.$el);
                return this;
            },

            show: function () {
                this.$el.show();
            },

            hide: function () {
                this.$el.hide();
            },
            destroy: function () {
                this.$el.html(null);
            }

        });
    return new MainView();
});





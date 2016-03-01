define([
    'jquery',
    'backbone',
    'tmpl/login'
], function(
    $,
    Backbone,
    tmpl
){

    return Backbone.View.extend({

        template: tmpl,
        initialize: function () {
        },

        show: function () {
            console.log("i am in login.show()");
            this.$el.show();
        },

        hide: function () {
            this.$el.hide();
        },

        render: function () {
            this.$el.appendTo($("#view__holder"));
            console.log("[views::scoreboard::render()]: called");
            console.log(this.$el);
            this.$el.html(this.template());
            return this;
        }
    });

    //return View;
});
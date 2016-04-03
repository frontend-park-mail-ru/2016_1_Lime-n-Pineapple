define([
    'jquery',
    'underscore',
    'backbone',
    'tmpl/main_page'
], function(
    $,
    _,
    Backbone,
    tmpl
){
    var Main = Backbone.View.extend({
        className: "view__main",
        template: tmpl,

        initialize: function () {
        },

        show: function () {
            this.trigger("showView");
            this.$el.show();
            console.log(this.$el);
        },

        hide: function () {
            this.$el.hide();
        },

        render: function () {
            console.log("main.show.render()");
            this.$el.html(this.template({}));


            return this;
        }
    });
    return new Main();
});

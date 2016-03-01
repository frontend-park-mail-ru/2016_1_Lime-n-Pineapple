//define([
//    'backbone',
//    'tmpl/main'
//], function(
//    Backbone,
//    tmpl
//){
//
//    var View = Backbone.View.extend({
//
//        template: tmpl,
//        initialize: function () {
//            // TODO
//        },
//        render: function () {
//            // TODO
//        },
//        show: function () {
//            // TODO
//        },
//        hide: function () {
//            // TODO
//        }
//
//    });
//
//    return new View();
//});
define([
    'underscore',
    'backbone',
    'tmpl/main_page'
], function(
    _,
    Backbone,
    tmpl
){
    /**
     * Created by Raaw on 28-Feb-16.
     */
    var View = Backbone.View.extend({
        className: "view__main",
        template: tmpl,
        el: $(".view__main"), // DOM элемент widget'а

        initialize: function() {
        },

        show: function() {
            console.log("main.show()")
            this.render();
        },

        remove: function() {
            this.$el.empty().off(); /* off to unbind the events */
            this.stopListening();
            return this;
        },

        hide: function() {
            this.remove();
        },

        render: function () {
            console.log("main.show.render()")
            $(this.el).html(this.template({}));
            return this;
        }
    });
    return View;
});

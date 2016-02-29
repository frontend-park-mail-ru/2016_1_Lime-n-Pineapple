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
    var MainView = Backbone.View.extend({
        className: "view__main",
        template: tmpl,
        el: $(".view__main"), // DOM элемент widget'а


        initialize: function() {
        },


        render: function () {
            $(this.el).html(this.template({}));
            return this;
        }
    });

    //var mainView = new MainView(); // Singletone?
    //mainView.render();
    return new MainView();
});

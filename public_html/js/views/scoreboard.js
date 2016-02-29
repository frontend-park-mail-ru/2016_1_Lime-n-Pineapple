define([
    'backbone',
    'tmpl/scoreboard',
    '../collections/scores'
], function(
    Backbone,
    tmpl,
    Scores
){

    var View = Backbone.View.extend({
        className: "view__scoreboard",
        template: tmpl,
        el: $(".view__scoreboard"),

        initialize: function () {
            //this.setElement(this.el);
        },
        render: function () {
            $(this.el).html(this.template({}));
            return this;
        }
        //show: function () {
        //    // TODO
        //},
        //hide: function () {
        //    // TODO
        //}

    });

    //var view = new View();
    //view.render();
    return new View();
});
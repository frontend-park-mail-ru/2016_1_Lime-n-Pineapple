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
        tagName: "div",
        id: "",
        attributes: "",
        template: tmpl,
        el: ".view__scoreboard",
        events: {
            "initView": 'render',
            "show": 'show'
        },

        initialize: function () {
            this.bind("initView", function(){this.render();}, this);
        },
        render: function () {

            console.log("[views::scoreboard::render()]: called");
            console.log(this.$el);
            this.$el.html(this.template({}));
            return this;
        },

        show: function () {
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        }

    });

    //var view = new View();
    //view.render();
    return new View();
});
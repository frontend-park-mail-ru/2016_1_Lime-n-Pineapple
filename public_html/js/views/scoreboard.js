define([
    'jquery',
    'backbone',
    'tmpl/scoreboard',
    'collections/scores'
], function(
    $,
    Backbone,
    tmpl,
    Scores
){

    return Backbone.View.extend({
        template: tmpl,

        events: {
            "initView": 'render',
            "show": 'show'
        },

        initialize: function () {
            var collection = new Scores([
                {name: "Тим", age: 5},
                {name: "Ида", age: 26},
                {name: "Роб", age: 55}
            ]);
        },

        show: function () {
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
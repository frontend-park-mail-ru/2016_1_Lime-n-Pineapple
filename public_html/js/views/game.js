define([
    'backbone',
    'tmpl/game'
], function(
    Backbone,
    tmpl
){

    var Game = Backbone.View.extend({

        template: tmpl,
        initialize: function () {
            // TODO
        },
        render: function () {
            // TODO
        },
        show: function () {
            this.trigger("showView");
            // TODO
        },
        hide: function () {
            // TODO
        }

    });
    return new Game();
});
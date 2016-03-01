/**
 * Created by leegheid on 01.03.16.
 */
define([
    'backbone',
    'tmpl/btn_back',
], function(
    Backbone,
    tmpl
){

    var View = Backbone.View.extend({
        template: tmpl,
        className: "view__btn_back",
        events: {
            "click": 'clickBtn',
        },

        initialize: function () {
            //this.render();
        },

        clickBtn: function() {
            this.trigger("back");
        },

        show: function () {
            console.log("i am here, in btn.show()")
            this.$el.show();

        },
        hide: function () {
            this.$el.hide();
        },

        render: function () {
            console.log("btn_back.render in scoreboard was called");
            console.log(this.$el);
            this.$el.html(this.template({}));
            return this;
        }

    });
    return View;
});
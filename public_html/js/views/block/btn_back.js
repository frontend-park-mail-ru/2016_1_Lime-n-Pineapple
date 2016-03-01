/**
 * Created by leegheid on 01.03.16.
 */
define([
    'jquery',
    'backbone',
    'tmpl/btn_back'
], function(
    $,
    Backbone,
    tmpl
){

    return Backbone.View.extend({
        template: tmpl,
        className: "js-btn_back",
        events: {
            "click": 'clickBtn'
        },

        initialize: function () {

        },

        clickBtn: function() {
            console.log("click on back");
            this.trigger("back");
        },

        show: function () {
            console.log("i am here, in btn.show()");
            this.$el.show();
            this.startBack();
        },

        startBack: function () {
            this.stopBack();
                this.on("back", function () {
                    console.log("[Btn_Back]: back() called");
                    Backbone.history.history.back();
                }, this);
        },

        stopBack: function () {
            this.off("back");
        },

        hide: function () {
            this.$el.hide();
            this.stopBack();
        },

        render: function () {
            this.$el.appendTo($("#view__btn_back"));
            console.log("btn_back.render in scoreboard was called");
            console.log(this.$el);
            this.$el.html(this.template({}));
            return this;
        }

    });
    //return View;
});
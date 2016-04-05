'use strict';
define([
    'jquery',
    'backbone',
    'tmpl/btn_back'
], function(
    $,
    Backbone,
    tmpl
){

    var BtnBack = Backbone.View.extend({
        template: tmpl,
        events: {
            "click": 'clickBtn'
        },

        initialize: function () {

        },

        clickBtn: function() {
            console.log("click on back");
            Backbone.history.history.back();
            //this.trigger("back");
            //console.log(Backbone.history);
        },

        show: function () {
            this.trigger("showView", this);
        },


        hide: function () {
            this.$el.hide();
        },

        render: function () {
            console.log("btn_back.render was called");
            console.log(this.$el);
            this.$el.html(this.template());
            return this;
        }

    });
    return new BtnBack();
});
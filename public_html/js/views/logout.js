/**
 * Created by leegheid on 16.03.16.
 */
define([
    'jquery',
    'backbone',
    '../models/session'
], function ($, Backbone, Session) {
    var LogOut = Backbone.View.extend({

        initialize: function () {

        },
        show: function () {
            console.log("i am in login.show()");
            this.trigger("showView");
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        },

        onSubmitEvent: function () {
            //e.preventDefault();
            console.log("[views::logout::_onSubmitEvent()]: called");
            //console.log("Sending request to: " + url + " ...");
            Session.logout({});
        },

        render: function () {
            console.log("[views::logout::render()]: called");
            console.log(this.$el);
            return this;
        }
    });
    return new LogOut();

});

'use strict';
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
            this.trigger("showView", this);
        },
        hide: function () {
            this.$el.hide();
        },

        onSubmitEvent: function () {
            //e.preventDefault();
            console.log("[views::logout::_onSubmitEvent()]: called");
            //console.log("Sending request to: " + url + " ...");
            var reqObj = {
                "login": Session.getUser().login
            };
            Session.logout(reqObj);
        },

        render: function () {
            console.log("[views::logout::render()]: called");
            console.log(this.$el);
            return this;
        }
    });
    return new LogOut();

});

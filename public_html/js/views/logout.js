/**
 * Created by leegheid on 16.03.16.
 */
define([
    'jquery',
    'backbone',
    'settings'
], function ($, Backbone, Settings) {
    return Backbone.View.extend({

        initialize: function () {

        },
        show: function () {
            console.log("i am in login.show()");
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        },

        onSubmitEvent: function () {
            //e.preventDefault();
            console.log("[views::logout::_onSubmitEvent()]: called");
            var url = Settings.getActiveServerUrl() + '/api/v1/session';
            console.log("Sending request to: " + url + " ...");
            $.ajax(
                {
                    url: url,
                    type: "delete",
                    contentType: "application/json",
                    dataType: "json"
                }
            )
                .done(
                function (e) {
                    console.log("Accepted");
                    Backbone.history.history.back();
                }
            )
                .fail(function (req, err, e) {
                    console.log("Failed to fetch request");
                    console.log(req);
                    console.log(err);
                    console.log(e);
                    Backbone.history.history.back();
                });

            console.log("logout change");
            $("#login").text("Login");
            $("#login").attr('href', "#login");
        },

        render: function () {
            console.log("[views::logout::render()]: called");
            console.log(this.$el);
            return this;
        }
    });

    //return View;
});

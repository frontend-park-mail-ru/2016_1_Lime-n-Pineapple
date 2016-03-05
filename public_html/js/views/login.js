define([
    'jquery',
    'backbone',
    'tmpl/login',
    'settings'
], function ($, Backbone, tmpl, Settings) {

    return Backbone.View.extend({
        template: tmpl,
        initialize: function () {

        },
        show: function () {
            console.log("i am in login.show()");
            this.$el.show();
        },
        hide: function () {
            this.$el.hide();
        },

        _onSubmitEvent: function (e) {
            e.preventDefault();
            console.log("[views::login::_onSubmitEvent()]: called");
            var $form = $(this),
                login = $form.find("input[name='username']").val(),
                password = $form.find("input[name='password']").val();
            // Send the data using post
            var url = Settings.getActiveServerUrl() + '/api/v1/session';
            console.log("Sending request to: " + url + " ...");
            var reqObj = {
                "login": login,
                "password": password
            };
            console.log("Login: ", login, "Password: ", password, "Request object: ", reqObj);
            console.log("Request parsed as JSON: ", JSON.stringify(reqObj));
            $.ajax(
                {
                    url: url,
                    type: "put",
                    contentType: "application/json",
                    data: JSON.stringify(reqObj),
                    dataType: "json"
                }
            )
                .done(
                    function (e) {
                        console.log("Accepted");
                    }
                )
                .fail(function (req, err, e) {
                    console.log("Failed to fetch request");
                    console.log(req);
                    console.log(err);
                    console.log(e);
                });
        },

        render: function () {
            console.log("[views::login::render()]: called");
            console.log(this.$el);
            this.$el.html(this.template());
            this.$el.on("submit", this._onSubmitEvent);
            return this;
        }
    });

    //return View;
});
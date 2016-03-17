define([
    'jquery',
    'backbone',
    'tmpl/login',
    '../models/session'
], function ($, Backbone, tmpl, Session) {
    var Login = Backbone.View.extend({
        template: tmpl,
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

        _onSubmitEvent: function (e) {
            e.preventDefault();
            console.log("[views::login::_onSubmitEvent()]: called");
            var $form = $(this),
                login = $form.find("input[name='username']").val(),
                password = $form.find("input[name='password']").val();

            //console.log("Sending request to: " + url + " ...");
            var reqObj = {
                "login": login,
                "password": password
            };
            console.log("Login: ", login, "Password: ", password, "Request object: ", reqObj);
            console.log("Request parsed as JSON: ", JSON.stringify(reqObj));

            Session.login(reqObj);
        },

        render: function () {
            console.log("[views::login::render()]: called");
            console.log(this.$el);
            this.$el.html(this.template());
            this.$el.on("submit", this._onSubmitEvent);
            return this;
        }
    });
    return new Login();
});
define([
    'jquery',
    'backbone',
    'tmpl/login',
    '../models/session',
    'views/users_manager'
], function ($, Backbone, tmpl, Session, UsersManager) {
    var Login = Backbone.View.extend({
        template: tmpl,

        events:{
            'submit #login-form__btn-success': '_onSubmitEvent'
        },

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

        _onSubmitEvent: function () {
            //e.preventDefault();
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
            if (Session.login(reqObj)){
                $("#login").text("Logout");
                $("#login").attr('href', "#logout");
            }
        },

        render: function () {
            console.log("[views::login::render()]: called");
            console.log(this.$el);
            this.$el.html(this.template());
            //this.$el.on("submit", this._onSubmitEvent);
            return this;
        }
    });
    return new Login();
});
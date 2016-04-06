'use strict';
define([
    'jquery',
    'backbone',
    'settings',
    'models/session',
    './baseView',
    'tmpl/login'
], function ($, Backbone,  Settings, Session, BaseView, tmpl) {
    var Login = BaseView.extend({
        template: tmpl,
        events: {
            'click .btn-back' : function(e) {
                Backbone.history.history.back();
            }
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
            console.log("Login: ", login, "Password: ", password, "Request object: ", reqObj);
            console.log("Request parsed as JSON: ", JSON.stringify(reqObj));
            if (Session.login(reqObj)) {
                Backbone.trigger("loginSuccess");
            }
        },

        render: function () {
            console.log("[views::login::render()]: called");
            this.$el.html(this.template());
            this.$el.on("submit", this._onSubmitEvent);
            return this;
        }
    });
    return new Login();
});
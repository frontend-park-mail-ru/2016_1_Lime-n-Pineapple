define([
    'jquery',
    'backbone',
    'tmpl/login',
    '../models/session'
    ],
    function ($, Backbone, tmpl, Session) {
        var Login = Backbone.View.extend({
            template: tmpl,

            // don't work// must to ask
            //events:{
            //    'submit #login-form__btn-success': '_onSubmitEvent'
            //},

            initialize: function () {
            },

            show: function () {
                if (!this.$el.html()){
                    this.render();
                }
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

                var reqObj = {
                    "login": login,
                    "password": password
                };
                console.log("Login: ", login, "Password: ", password, "Request object: ", reqObj);
                console.log("Request parsed as JSON: ", JSON.stringify(reqObj));
                if (Session.login(reqObj)){
                    Backbone.trigger("changeLoginToLogout");
                }
            },

            render: function () {
                console.log("[views::login::render()]: called");
                console.log(this.$el);
                if (!this.$el.html()){
                    this.$el.on("submit", this._onSubmitEvent);
                }
                this.$el.html(this.template());
                return this;
            }
        });
        return new Login();
    }
);
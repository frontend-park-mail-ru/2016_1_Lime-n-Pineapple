/**
 * Created by Raaw on 05-Mar-16.
 */
define([
        'jquery',
        'backbone',
        'models/user',
        'settings',
        'views/users_manager'
    ],
    function ($, Backbone, UserModel, Settings, UsersManager) {

        var Session = Backbone.Model.extend({

            defaults: {
                user: null
            },

            initialize: function () {
                UsersManager.attachEvent(this);
                //_.bindAll(this);
                this.user = new UserModel();
                this.trigger("createUser", [this.user]);
                console.log("[Session::initialize()]: begin to create" );
            },

            updateSessionUser: function( userData ){
                this.user.set(_.pick(userData, _.keys(this.user.defaults)));
            },

            checkAuth: function() {
                var self = this;
                this.fetch({
                    success: function(mod, res){
                        if(!res.error && res.user){
                            self.updateSessionUser(res.user);
                            self.set({ logged_in : true });
                        } else {
                            self.set({ logged_in : false });
                        }
                    }, error:function(mod, res){
                        self.set({ logged_in : false });
                    }
                }).complete( function(){
                });
            },


            login: function(opts){
                console.log("session login func" + this.user.url());
                this.user.save({login: opts.login, password: opts.password, logged_in: true}, {
                    success: function(model, res){
                        console.log("SUCCESS");
                        this.user.set({logged_in: true, login: opts.login});
                        $("#login").text("Logout");
                        $("#login").attr('href', "#logout");
                        Backbone.history.history.back();
                    },
                    error: function(model, res){
                        console.log("NOTSUCCESS");
                        Backbone.history.history.back();
                    }
                });
            },

            logout: function(opts){
                this.user.save({login: opts.login}, {
                    success: function(model, res){
                        this.user.set({logged_in: false, login: ""});
                        $("#login").text("Login");
                        $("#login").attr('href', "#login");
                        Backbone.history.history.back();
                    },
                    error: function(model, res){
                        Backbone.history.history.back();
                    }
                });
            },

            signup: function(opts){
            },

            removeAccount: function(opts){
                this.user.destroy({
                    success: function(model, res){
                        console.log("destroy user");
                    },
                    error: function(model, res){
                        console.log("can not destroy user");
                    }
                });
            }


        });
        return new Session();
    }
);

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
                //UsersManager.attachEvent(this);
                this.user = new UserModel();
                this.trigger("createUser", this.user);
                console.log("[Session::initialize()]: begin to create" );
            },

            updateSessionUser: function( userData ){
                this.user.set(_.pick(userData, _.keys(this.user.defaults)));
            },

            checkAuth: function() {
                console.log("[Session::checkAuth()]: before start");
                var self = this;
                //this.fetch({
                //    success: function(mod, res){
                //        if(!res.error && res.user){
                //            self.updateSessionUser(res.user);
                //            self.set({ logged_in : true });
                //        } else {
                //            self.set({ logged_in : false });
                //            this.trigger("loginAction");
                //        }
                //    }, error:function(mod, res){
                //        self.set({ logged_in : false });
                //    }
                //}).complete( function(){
                //});
                if (!self.user.logged_in) {
                    console.log("[Session::checkAuth()]: before start");
                    //this.trigger("#loginAction");
                    Backbone.history.navigate("login", true);
                }
            },


            login: function(opts){
                console.log("session login func" + this.user.url());
                var self = this;
                this.user.save({login: opts.login, password: opts.password, logged_in: true}, {
                    success: function(model, res){
                        console.log("SUCCESS");
                        self.user.set({logged_in: true, login: opts.login});
                        Backbone.history.history.back();
                        return true;
                    },
                    error: function(model, res){
                        console.log("NOTSUCCESS");
                        Backbone.history.history.back();
                        return true; // must be false, when front will be use backend
                    }
                });
            },

            logout: function(){
                var self = this;
                this.user.save({login: this.user.login}, {
                    success: function(model, res){
                        self.user.set({logged_in: false, login: ""});
                        Backbone.history.history.back();
                        return true;
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

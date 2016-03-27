/**
 * Created by Raaw on 05-Mar-16.
 */
define([
        'jquery',
        'backbone',
        'models/user',
        'settings',
        'collections/scores'
    ],
    function ($, Backbone, UserModel, Settings, Scores) {

        var Session = Backbone.Model.extend({

            defaults: {
                user: null
            },

            getUser: function(){
                return this.user;
            },

            initialize: function () {
                //_.bindAll(this);
                this.user = new UserModel();
                this.collection = new Scores();
                this.collection.add(this.user);
                //this.user.set("id", this.user.cid);
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

            //postAuth: function(opts){
            //    var url = Settings.getActiveServerUrl() + '/api/v1/session';
            //
            //    $.ajax({
            //        url: url + '/' + opts.method,
            //        type: "POST",
            //        contentType: "application/json",
            //        data:  JSON.stringify( _.omit(opts, 'method') ),
            //        dataType: "json"
            //    })
            //        .done(
            //            function (e) {
            //                console.log("Accepted");
            //                if (opts.method === "login") {
            //                    $("#login").text("Logout");
            //                    $("#login").attr('href', "#logout");
            //                }
            //                else if (opts.method === "logout"){
            //                    $("#login").text("Login");
            //                    $("#login").attr('href', "#login");
            //                }
            //                Backbone.history.history.back();
            //            }
            //        )
            //        .fail(
            //            function (req, err, e) {
            //                console.log("Failed to fetch request");
            //                console.log(req);
            //                console.log(err);
            //                console.log(e);
            //                Backbone.history.history.back();
            //            });
            //
            //},


            login: function(opts){
                //this.postAuth(_.extend(opts, { method: 'login' }));
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
                //this.postAuth(_.extend(opts, { method: 'logout' }));
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
                //this.postAuth(_.extend(opts, { method: 'signup' }));
            },

            removeAccount: function(opts){
                //this.postAuth(_.extend(opts, { method: 'remove_account' }));
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

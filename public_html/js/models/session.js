/**
 * Created by Raaw on 05-Mar-16.
 */
define([
        'jquery',
        'backbone',
        'models/user',
        'settings'
    ],
    function ($, Backbone, UserModel, Settings) {

        var Session = Backbone.Model.extend({

            defaults: {
                user_id: 0,
                game_room_id: 0,
                logged_in: false
            },

            initialize: function () {
                //_.bindAll(this);
                this.user = new UserModel();
                console.log("[Session::initialize()]: begin to create");
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

            postAuth: function(opts){
                var url = Settings.getActiveServerUrl() + '/api/v1/session';
                $.ajax({
                    url: url + '/' + opts.method,
                    type: "POST",
                    contentType: "application/json",
                    data:  JSON.stringify( _.omit(opts, 'method') ),
                    dataType: "json"
                })
                    .done(
                        function (e) {
                            console.log("Accepted");
                            if (opts.method === "login") {
                                $("#login").text("Logout");
                                $("#login").attr('href', "#logout");
                            }
                            else if (opts.method === "logout"){
                                $("#login").text("Login");
                                $("#login").attr('href', "#login");
                            }
                            Backbone.history.history.back();
                        }
                    )
                    .fail(
                        function (req, err, e) {
                            console.log("Failed to fetch request");
                            console.log(req);
                            console.log(err);
                            console.log(e);
                            Backbone.history.history.back();
                        });

            },


            login: function(opts){
                this.postAuth(_.extend(opts, { method: 'login' }));
            },

            logout: function(opts){
                this.postAuth(_.extend(opts, { method: 'logout' }));
            },

            signup: function(opts){
                this.postAuth(_.extend(opts, { method: 'signup' }));
            },

            removeAccount: function(opts){
                this.postAuth(_.extend(opts, { method: 'remove_account' }));
            }


        });
        return new Session();
    }
);

/**
 * Created by leegheid on 28.03.16.
 */
define([
    'backbone',
    'collections/users'
], function(Backbone, CollectionUsers) {

    var UsersManager = Backbone.View.extend({

        initialize: function(){
            console.log("in UsersManager initialize");
            this.usersCollection = new CollectionUsers();
        },

        attachEvent: function(model){
            this.listenTo(model, "createUser", this.add);
        },

        add: function(model){
            console.log("in UsersManager add function");
            this.usersCollection.add(model);
        }

    });

    return new UsersManager();

});
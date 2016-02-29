define([
    'underscore',
    'backbone',
    //'../models/score'
], function(
    _,
    Backbone
    //Score
){

    var PlayersCollection = Backbone.Collection.extend({
        //model : Score,
        //comparator: function() {
        //    return this.get("score");
        //}
    });

    return new PlayersCollection();
});
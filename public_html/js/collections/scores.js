define([
    'underscore',
    'backbone',
    '../models/score'
], function(
    _,
    Backbone,
    Score
){

    return Backbone.Collection.extend({
        model : Score,
        comparator: function() {
            return this.get("score");
        }
    });

});
define([
    'underscore',
    'backbone',
    '../models/user'
], function(
    _,
    Backbone,
    Score
){

    return Backbone.Collection.extend({
        model : Score,
        comparator: function(val) {
            return -val.get("score");
        }

    });

});
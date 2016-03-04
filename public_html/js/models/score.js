define(['backbone'], function(Backbone){

    return Backbone.Model.extend({
        defaults: function () {
            return {
                "name": "",
                "score": "0"
            };
        }
    });
});
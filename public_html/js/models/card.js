define([
    'backbone'
], function (Backbone) {
    var Card = Backbone.Model.extend(
        {
            defaults: {
                name: "",
                img: ""
            },
            initialize: function (model) {
                console.log("Card initialize");
                this.img = model.img;
                this.name = model.name;
            }
        }
    );
    return Card;
});

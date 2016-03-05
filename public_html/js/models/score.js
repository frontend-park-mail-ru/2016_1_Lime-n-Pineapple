define(['backbone'], function (Backbone) {
    var ScoreModel = Backbone.Model.extend(
        {
            defaults: { id: 0, name: "", score: 0},
            initialize: function () {
                console.log("[ScoreModel::initialize]", "initalizing...");
                this.on("increment", function (value) {
                    this.set("score", this.get("score") + value);
                }, this);
            }
        }
    );
    return ScoreModel;
});
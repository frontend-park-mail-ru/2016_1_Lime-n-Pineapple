/**
 * Created by leegheid on 16.03.16.
 */
define([
    'backbone'
], function(Backbone){

    var ViewManager = Backbone.View.extend({
        views : [],
        initialize : function(){
            //this.views = [];
        },

        add: function(view){
            this.views.push(view);
            this.listenTo(view, "showView", this.hide);
        },

        addArray : function(array){
            var self = this;
            console.log(self.views);
            _.each(array,function(view){
                self.views.push(view);
                self.listenTo(view, "showView", self.hide);
            });
        },

        hide: function () {
            _.each(this.views, function(view){
                view.hide();
            });
        }


    });
    return new ViewManager();

});
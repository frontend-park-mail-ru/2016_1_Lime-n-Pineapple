'use strict';

define([
    'underscore',
    'backbone',
    'settings'
], function(_, Backbone, Settings){

    var ViewManager = Backbone.View.extend({
        initialize : function(){
            this.views = [];
        },

        add: function(view){
            this.views.push(view);
            this.listenTo(view, Settings.VIEWMANAGER_SHOW_EVENT, ( view ) => {
                console.log("[ViewManager::add::listenTo] Triggered!");
                this.hide(view);
                this.$el.show();
            } );
        },

        addArray : function(array){
            var self = this;
            _.each(array,function(view){
                this.add(view);
            }, this);
        },

        hide: function (exceptThisView) {
            _.each(this.views, function(view){
                if (view !== exceptThisView) {
                    view.hide();
                }
            });
        }

    });
    return new ViewManager();

});
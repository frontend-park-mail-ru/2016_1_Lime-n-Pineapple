define([
    'jquery',
    'underscore',
    'backbone',
    'tmpl/main_page'
], function(
    $,
    _,
    Backbone,
    tmpl
){
    var Main = Backbone.View.extend({
        template: tmpl,

        events:{
          'click #start': '_onSubmitEvent'
        },

        initialize: function () {
        },

        show: function () {
            console.log("[!] Main.show() is called");
            this.trigger("showView", this);
            }
        },

        _onSubmitEvent: function () {
            //e.preventDefault();
            console.log("[views::main::_onSubmitEvent()]: called");
            //Session.checkAuth();
        },


        hide: function () {
            this.$el.hide();
        },

        render: function () {
            console.log("main.show.render()");
            this.$el.html(this.template());
            //this.$el.on("submit", this._onSubmitEvent);

            return this;
        }
    });
    return new Main();
});

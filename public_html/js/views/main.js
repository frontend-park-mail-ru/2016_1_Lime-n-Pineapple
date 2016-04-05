define([
    'jquery',
    'underscore',
    'backbone',
    '../models/session',
    'tmpl/main_page'
], function(
    $,
    _,
    Backbone,
    Session,
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
            this.trigger("showView");
            this.$el.show();
            console.log(this.$el);
        },

        _onSubmitEvent: function () {
            //e.preventDefault();
            console.log("[views::main::_onSubmitEvent()]: called");
            Session.checkAuth();
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

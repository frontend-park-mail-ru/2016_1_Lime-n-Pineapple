'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    './baseView',
    'tmpl/main_page'
    ],
    function( $, _, Backbone, Settings, BaseView, tmpl ){
        var Main = BaseView.extend({
            template: tmpl,
            subscriptions: [
                'loginSuccess'
            ],
            events:{
                'click #start': '_onSubmitEvent',
                'click #scoreboard': 'navigate',
                'click #login': 'navigate'
            },

            initialize: function () {

            },
            _onSubmitEvent: function () {
                //e.preventDefault();
                console.log("[views::main::_onSubmitEvent()]: called");
                //Session.checkAuth();
            },
            navigate: function (e) {
                Backbone.history.navigate($(e.target).attr("href"), true);
            }
        });
        return new Main();
    }
);

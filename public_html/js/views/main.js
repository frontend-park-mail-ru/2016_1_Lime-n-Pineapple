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
              'click #start': '_onSubmitEvent'
            },

            initialize: function () {

            },
            _onSubmitEvent: function () {
                //e.preventDefault();
                console.log("[views::main::_onSubmitEvent()]: called");
                //Session.checkAuth();
            }
        });
        return new Main();
    }
);

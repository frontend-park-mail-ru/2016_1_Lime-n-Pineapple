'use strict';
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    './baseView',
    'tmpl/main_page'
], function( $, _, Backbone, Settings, BaseView, tmpl ){
    var Main = BaseView.extend({
        template: tmpl,

        subscriptions: [
            'loginSuccess'
        ],

        events: {
            'click #start': '_onSubmitEvent'
        },

        initialize: function () {
            Backbone.on("changeLoginToLogout", function () {
                $("#login").text("Logout");
                $("#login").attr('href', "#logout");
            });
        },
    });
        return new Main();
    }
);

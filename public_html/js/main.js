require.config({
    urlArgs: "_=" + (new Date()).getTime(),
    baseUrl: "js",
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone"
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        }
    }
});

define(['backbone', 'routers/router', 'views/main'], function (Backbone, router, view) {
    "use strict";
    Backbone.history.start();
    router.navigate("lolka", {trigger: true});

});



/**
 * Created by Raaw on 27-Feb-16.
 */


/*global define*/
define(
    [
        'jquery',
        'backbone',
        'collections/maincontrols'
    ],
    function ($, Backbone,  Common) {
        'use strict';

        var MainControlsRouter = Backbone.Router.extend({
            routes: {
                '*filter': 'setFilter'
            },
            setFilter: function (param) {
                // Set the current filter to be used
                Common.TodoFilter = param || '';
                // Trigger a collection filter event, causing hiding/unhiding
                // of the Todo view items21
            }
        });
        return new MainControlsRouter();
    }
);

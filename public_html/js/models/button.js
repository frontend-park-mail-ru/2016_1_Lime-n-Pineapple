/**
 * Created by Raaw on 27-Feb-16.
 */
/*global define*/
define([
    'underscore',
    'backbone'
], function (_, Backbone) {
    'use strict';

    var Button = Backbone.Model.extend({
        // Default attributes for the todo
        // and ensure that each todo created has `title` and `completed` keys.
        defaults: {
            name: '',
            default: false,
            onclick: function (name) {
                alert('LOL');
            }
        },

        // Toggle the `completed` state of this todo item.
        click: function () {
            //call 'onclick' function
            this.get('onclick')(this.get('name'));
        }
    });

    return new Button();
});


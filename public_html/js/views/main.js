//define([
//    'backbone',
//    'tmpl/main'
//], function(
//    Backbone,
//    tmpl
//){
//
//    var View = Backbone.View.extend({
//
//        template: tmpl,
//        initialize: function () {
//            // TODO
//        },
//        render: function () {
//            // TODO
//        },
//        show: function () {
//            // TODO
//        },
//        hide: function () {
//            // TODO
//        }
//
//    });
//
//    return new View();
//});
/**
 * Created by Raaw on 27-Feb-16.
 */
/*global define*/
define([
    'jquery',
    'underscore',
    'backbone',
    //'common',
    'fest'
], function ($, _, Backbone, todosTemplate, fest) {
    'use strict';

    var MainMenuView = Backbone.View.extend({

        tagName:  'div',
        className: 'menubutton_item',

        template: fest['components/button_main'],

        // The DOM events specific to an item.
        events: {
            'click .toggle':	'toggleCompleted',
            'dblclick label':	'edit',
            'click .destroy':	'clear',
            'keypress .edit':	'updateOnEnter',
            'keydown .edit':	'revertOnEscape',
            'blur .edit':		'close'
        },

        // The TodoView listens for changes to its model, re-rendering. Since there's
        // a one-to-one correspondence between a **Todo** and a **TodoView** in this
        // app, we set a direct reference on the model for convenience.
        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.listenTo(this.model, 'destroy', this.remove);
            this.listenTo(this.model, 'visible', this.toggleVisible);
        },

        // Re-render the titles of the todo item.
        render: function () {
            this.$el.html(this.template(this.model.attributes));
            return this;
        },



        // If you hit `enter`, we're through editing the item.
        updateOnEnter: function (e) {
            if (e.keyCode === Common.ENTER_KEY) {
                this.close();
            }
        },


        // Remove the item, destroy the model from *localStorage* and delete its view.
        clear: function () {
            this.model.destroy();
        },
        destroy: function () {

        }
    });

    return MainMenuView;
});





'use strict';

function _newArrowCheck(innerThis, boundThis) { if (innerThis !== boundThis) { throw new TypeError("Cannot instantiate an arrow function"); } }

define(['underscore', 'backbone', 'settings'], function (_, Backbone, Settings) {

    var ViewManager = Backbone.View.extend({
        initialize: function initialize() {
            this.views = [];
        },

        add: function add(view) {
            var _this = this;

            this.views.push(view);
            this.listenTo(view, Settings.VIEWMANAGER_SHOW_EVENT, function (view) {
                _newArrowCheck(this, _this);

                console.log("[ViewManager::add::listenTo] Triggered!");
                this.hide(view);
                this.$el.show();
            }.bind(this));
        },

        addArray: function addArray(array) {
            var self = this;
            _.each(array, function (view) {
                this.add(view);
            }, this);
        },

        hide: function hide(exceptThisView) {
            _.each(this.views, function (view) {
                if (view !== exceptThisView) {
                    view.hide();
                }
            });
        }

    });
    return new ViewManager();
});

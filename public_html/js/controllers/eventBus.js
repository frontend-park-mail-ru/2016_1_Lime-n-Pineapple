'use strict';

define([
    'backbone'
], function (Backbone) {
    class EventBus {
        constructor() {
            this.subscriptions = new Map();
        }
        toString() {
            return '[EventBus class instance]';
        }
        // This method will add the eventTarget to the list of subscriptions
        subscribe(eventTarget, ...eventNames) {
            //check that this is insatnce of Backbone.Event
            if(!Backbone.Events.isPrototypeOf(eventTarget)) {
                throw new TypeError("eventTarget must be derived from Backbone.Events");
            }
            for (let name of eventNames) {
                if (!this.subscriptions.has(name)) {
                    this.subscriptions.set(name, new Set([eventTarget]));
                } else {
                    this.subscriptions.get(name).push(eventTarget);
                }
            }
        }
        unsubscribe(eventTarget, ...eventNames) {
            if (!Backbone.Events.isPrototypeOf(eventTarget)) {
                throw new TypeError("eventTarget mus be derived from Backbone.Events");
            }
            for (let name of eventNames) {
                if (this.subscriptions.has(name)) {
                    this.subscriptions.get(name).delete(eventTarget);
                }
            }
        }

        trigger(eventName, ...eventArgs) {



            let subs = this.subscriptions.get(eventName);
            if (subs !== undefined) {
                for (let subObject of subs) {
                    subObject.trigger(eventName, eventArgs);
                }
            }
        }

    }

    return EventBus;
});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['backbone'], function (Backbone) {
    var EventBus = function () {
        function EventBus() {
            _classCallCheck(this, EventBus);

            this.subscriptions = new Map();
        }

        _createClass(EventBus, [{
            key: 'toString',
            value: function toString() {
                return '[EventBus class instance]';
            }
            // This method will add the eventTarget to the list of subscriptions

        }, {
            key: 'subscribe',
            value: function subscribe(eventTarget) {
                //check that this is insatnce of Backbone.Event
                if (!Backbone.Events.isPrototypeOf(eventTarget)) {
                    throw new TypeError("eventTarget must be derived from Backbone.Events");
                }

                for (var _len = arguments.length, eventNames = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                    eventNames[_key - 1] = arguments[_key];
                }

                var _iteratorNormalCompletion = true;
                var _didIteratorError = false;
                var _iteratorError = undefined;

                try {
                    for (var _iterator = eventNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        var name = _step.value;

                        if (!this.subscriptions.has(name)) {
                            this.subscriptions.set(name, new Set([eventTarget]));
                        } else {
                            this.subscriptions.get(name).push(eventTarget);
                        }
                    }
                } catch (err) {
                    _didIteratorError = true;
                    _iteratorError = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                            _iterator.return();
                        }
                    } finally {
                        if (_didIteratorError) {
                            throw _iteratorError;
                        }
                    }
                }
            }
        }, {
            key: 'unsubscribe',
            value: function unsubscribe(eventTarget) {
                if (!Backbone.Events.isPrototypeOf(eventTarget)) {
                    throw new TypeError("eventTarget mus be derived from Backbone.Events");
                }

                for (var _len2 = arguments.length, eventNames = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
                    eventNames[_key2 - 1] = arguments[_key2];
                }

                var _iteratorNormalCompletion2 = true;
                var _didIteratorError2 = false;
                var _iteratorError2 = undefined;

                try {
                    for (var _iterator2 = eventNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                        var name = _step2.value;

                        if (this.subscriptions.has(name)) {
                            this.subscriptions.get(name).delete(eventTarget);
                        }
                    }
                } catch (err) {
                    _didIteratorError2 = true;
                    _iteratorError2 = err;
                } finally {
                    try {
                        if (!_iteratorNormalCompletion2 && _iterator2.return) {
                            _iterator2.return();
                        }
                    } finally {
                        if (_didIteratorError2) {
                            throw _iteratorError2;
                        }
                    }
                }
            }
        }, {
            key: 'trigger',
            value: function trigger(eventName) {

                var subs = this.subscriptions.get(eventName);
                if (subs !== undefined) {
                    for (var _len3 = arguments.length, eventArgs = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
                        eventArgs[_key3 - 1] = arguments[_key3];
                    }

                    var _iteratorNormalCompletion3 = true;
                    var _didIteratorError3 = false;
                    var _iteratorError3 = undefined;

                    try {
                        for (var _iterator3 = subs[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                            var subObject = _step3.value;

                            subObject.trigger(eventName, eventArgs);
                        }
                    } catch (err) {
                        _didIteratorError3 = true;
                        _iteratorError3 = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                _iterator3.return();
                            }
                        } finally {
                            if (_didIteratorError3) {
                                throw _iteratorError3;
                            }
                        }
                    }
                }
            }
        }]);

        return EventBus;
    }();

    return EventBus;
});

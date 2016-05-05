"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['jquery', 'underscore', 'backbone', 'settings', 'pixi'], function ($, _, Backbone, Settings, pixi) {
    var Renderer = function () {
        function Renderer(viewEl, viewDomID) {
            _classCallCheck(this, Renderer);

            _.extend(this, Backbone.Events);
            this.domID = viewDomID;
            this.viewEl = viewEl;
            var self = this;

            console.log("[renderer], constructor");

            Backbone.on("GameRender", function () {
                console.log("[renderer], GameRender event");

                this.stage = new pixi.Container();
                _.extend(this.stage, Backbone.Events);

                this.stage.on("AddChildToStage", function (sprite) {
                    this.stage.addChild(sprite);
                }, this);

                this.renderer = pixi.autoDetectRenderer($(this.viewEl).width() / 1.2, $(this.viewEl).height(), { transparent: true });
                document.getElementById(this.domID).appendChild(this.renderer.view);

                Backbone.trigger("AllRendered", this.stage);

                Backbone.on("render::renderAnimation", function (viewFunc, card) {
                    this.renderAnimation(viewFunc, card);
                }.bind(this));

                this.on("CardMoved", function () {
                    delete this.card;
                    delete this.moveFunc;
                }, this);

                this.intervalID = requestAnimationFrame(function (timeStamp) {
                    self.animate(timeStamp);
                });
            }, this);

            this.on("StopRender", function () {
                cancelAnimationFrame(this.intervalID);
                Backbone.trigger("RendererStoped");
            }, this).on("ResumeRender", function () {
                this.intervalID = requestAnimationFrame(function (timeStamp) {
                    self.animate();
                });
                Backbone.trigger("RendererResume");
            }, this);
        }

        _createClass(Renderer, [{
            key: 'renderAnimation',
            value: function renderAnimation(viewFunc, card) {
                cancelAnimationFrame(this.intervalID);
                this.animate(viewFunc, card);
            }
        }, {
            key: 'animate',
            value: function animate(viewFunc, card) {
                var self = this;
                if (viewFunc !== undefined) {
                    //viewFunc(card);
                }
                console.log("animate");
                this.renderer.render(this.stage);
                this.intervalID = requestAnimationFrame(function (timeStamp) {
                    self.animate(viewFunc, card);
                });
            }
        }]);

        return Renderer;
    }();

    return Renderer;
});

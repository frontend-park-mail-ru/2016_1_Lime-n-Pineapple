"use strict";
define([
    'jquery',
    'underscore',
    'backbone',
    'settings',
    'pixi'
], function ($, _, Backbone, Settings, pixi) {
        class Renderer {
            constructor(viewEl, viewDomID) {
                this.domID = viewDomID;
                this.viewEl = viewEl;
                let self = this;

                console.log("[renderer], constructor");

                Backbone.on("GameRender", function(container){
                    console.log("[renderer], GameRender event");
                    self.container = container;

                    self.renderer = pixi.autoDetectRenderer($(self.viewEl).width()/1.2, $(self.viewEl).height(), {transparent: true});
                    document.getElementById(self.domID).appendChild(self.renderer.view);

                    Backbone.trigger("AllRendered", self.renderer);

                    self.intervalID = setInterval(function() {
                        self.animate(self, container);
                    }, 100);
                });

                Backbone.on("StopRender", function(){
                    clearInterval(self.intervalID);
                    Backbone.trigger("RendererStoped");
                });

                Backbone.on("ResumeRender", function(){
                    self.intervalID = setInterval(function() {
                        self.animate(self, self.container);
                    }, 100);
                    Backbone.trigger("RendererResume");
                });
            }

            animate(self, container) {
                console.log("animate");
                if (!container.containers.containerPlayer.children.length){
                    container = {};
                    self.renderer = null;
                }
                self.renderer.render(container.stage);
            }

        }
        return Renderer;
    }
);



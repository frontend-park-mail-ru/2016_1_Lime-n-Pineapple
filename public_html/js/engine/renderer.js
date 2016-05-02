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
                    this.container = container;

                    this.renderer = pixi.autoDetectRenderer($(this.viewEl).width()/1.2, $(this.viewEl).height(), {transparent: true});
                    document.getElementById(this.domID).appendChild(this.renderer.view);

                    Backbone.trigger("AllRendered", this.renderer);

                    this.intervalID = setInterval(function() {
                        self.animate(self.container);
                    }, 100);
                }, this);

                Backbone.on("StopRender", function(){
                    clearInterval(this.intervalID);
                    Backbone.trigger("RendererStoped");
                }, this);

                Backbone.on("ResumeRender", function(){
                    this.intervalID = setInterval(function() {
                        self.animate(self.container);
                    }, 100);
                    Backbone.trigger("RendererResume");
                }, this);
            }

            animate(container) {
                console.log("animate");
                this.renderer.render(container.stage);
            }

        }
        return Renderer;
    }
);



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

                _.extend(this, Backbone.Events);
                this.domID = viewDomID;
                this.viewEl = viewEl;
                let self = this;

                console.log("[renderer], constructor");

                Backbone.on("GameRender", function(){
                    console.log("[renderer], GameRender event");

                    this.stage = new pixi.Container();
                    _.extend(this.stage, Backbone.Events);

                    Backbone.on("AddChildToStage", function(sprite){
                        this.stage.addChild(sprite);
                    }, this);


                    this.renderer = pixi.autoDetectRenderer($(this.viewEl).width(), $(this.viewEl).height(), {transparent: true});
                    document.getElementById(this.domID).appendChild(this.renderer.view);

                    this.stage.parent = this.renderer;

                    Backbone.trigger("AllRendered", this.stage);

                    Backbone
                        .on("render::renderAnimation", function (viewFunc, frames) {
                            this.viewFunc = viewFunc;
                            this.frames = frames;
                        }, this);

                    this.intervalID = requestAnimationFrame(function(timeStamp){
                        self.animate(timeStamp);
                    });
                }, this);

                this
                    .on("StopRender", function(){
                        cancelAnimationFrame(this.intervalID);
                        Backbone.trigger("RendererStoped");
                    }, this)
                    .on("ResumeRender", function(){
                        this.intervalID = requestAnimationFrame(function(timeStamp) {
                            self.animate();
                        });
                        Backbone.trigger("RendererResume");
                    }, this);
            }


            animate() {
                let self = this;
                if (this.frames > 0){
                    this.frames-=1;
                    this.viewFunc();
                }
                console.log("animate");
                this.renderer.render(this.stage);
                this.intervalID = requestAnimationFrame(function(timeStamp){
                    self.animate();
                });
            }

        }
        return Renderer;
    }
);
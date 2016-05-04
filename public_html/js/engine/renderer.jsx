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

                    this.stage.on("AddChildToStage", function(sprite){
                        this.stage.addChild(sprite);
                    }, this);

                    this.renderer = pixi.autoDetectRenderer($(this.viewEl).width()/1.2, $(this.viewEl).height(), {transparent: true});
                    document.getElementById(this.domID).appendChild(this.renderer.view);

                    Backbone.trigger("AllRendered", this.renderer, this.stage);

                    Backbone.on("CardMoveToCeil", function(moveFunc, card){
                        this.moveFunc = moveFunc;
                        this.card = card;
                    }, this);

                    this.on("CardMoved", function(){
                        delete this.card;
                        delete this.moveFunc;
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
                console.log("animate");
                if (this.moveFunc) {
                    this.moveFunc(this.card);
                }
                this.renderer.render(this.stage);
                this.intervalID = requestAnimationFrame(function(timeStamp){
                    self.animate();
                });
            }

        }
        return Renderer;
    }
);
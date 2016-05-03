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
                this.moveTimeRender = 10;

                console.log("[renderer], constructor");

                Backbone
                    .on("GameRender", function(container){
                        console.log("[renderer], GameRender event");
                        this.container = container;

                        this.renderer = pixi.autoDetectRenderer($(this.viewEl).width()/1.2, $(this.viewEl).height(), {transparent: true});
                        document.getElementById(this.domID).appendChild(this.renderer.view);

                        Backbone.trigger("AllRendered", this.renderer);

                        this.globalID = requestAnimationFrame(function(timeStamp){
                            self.animate(timeStamp);
                        });

                    }, this)

                    .on("StopRender", function(){
                        if (this.globalID) {
                            cancelAnimationFrame(this.globalID);
                        }
                        Backbone.trigger("RendererStoped");
                    }, this)

                    .on("ResumeRender", function(){
                        if (this.globalID){
                            cancelAnimationFrame(this.globalID);
                        }
                        this.globalID = requestAnimationFrame(function(timeStamp){
                            self.animate(timeStamp);
                        });
                        Backbone.trigger("RendererResume");
                    }, this)

                    .on("InfoCardMoveToInfoCeil", function(infoCard){
                        Backbone.trigger("StopRender");
                        this.globalID = requestAnimationFrame(function(timeStamp){
                            let deltaX = self.renderer.width - infoCard.width / 2 - infoCard.x,
                                deltaY = infoCard.height / 2 - infoCard.y;
                            let rateX = deltaX/(self.moveTimeRender),
                                rateY = deltaY/(self.moveTimeRender);

                            self.animateMoveCard(timeStamp, infoCard, rateX, rateY);
                        });

                    }, this)

                    .on("CardAreThrown", function(actionCard, container){
                        console.log("[Renderer], CardAreThrown EVENT");
                        Backbone.trigger("StopRender");
                        this.globalID = requestAnimationFrame(function(timeStamp){
                            actionCard.alpha = 1;
                            let deltaX = container.children.length * actionCard.width + 2 + actionCard.width/2 - actionCard.x,
                                deltaY = container.y + actionCard.height/2 - actionCard.y;
                            let rateX = deltaX/(self.moveTimeRender * 3),
                                rateY = deltaY/(self.moveTimeRender * 3);
                            console.log(rateX, rateY);

                            self.animateMoveCard(timeStamp, actionCard, rateX, rateY, container);
                        });
                    }, this);
            }
            
            cardMoveToCeil(card, rateX, rateY, container){
                card.x+=rateX;
                card.y+=rateY;
                if (Math.abs(card.x - card.mustX) < 10 && Math.abs(card.y - card.mustY) < 10){
                    Backbone.trigger("StopRender");
                    Backbone.trigger("ResumeRender");
                    if (container){
                        Backbone.trigger("CardMustAddToContainer", card, container);
                    }
                    return 1;
                }
                return 0;
            }

            animateMoveCard(time, card, rateX, rateY, container){
                let self = this;
                console.log("animateMoveCard");
                if (this.cardMoveToCeil(card, rateX, rateY, container)) {
                    return;
                }
                this._render();
                this.globalID = requestAnimationFrame(function(timeStamp){
                    self.animateMoveCard(timeStamp, card, rateX, rateY, container);
                });
            }

            animate(time) {
                let self = this;
                console.log("animate");
                this._render();
                this.globalID = requestAnimationFrame(function(timeStamp){
                    self.animate(timeStamp);
                });
            }

            _render(){
                this.renderer.render(this.container.stage);
            }


        }
        return Renderer;
    }
);



"use strict";
define([
        'jquery',
        'underscore',
        'backbone',
        'settings',
        'pixi',
        './card_collection-compiled'
    ], function ($, _, Backbone, Settings, pixi, CardCollection) {

        let oneLineHeight = $(window).height()/6;
        let width = $(window).width();

        // class completed
        class Container {
            constructor() {
                this.containers = {
                    containerPlayer:                null,
                    containerDistantFighting:       null,
                    containerInfighting:            null,
                    containerEnemyInfighting:       null,
                    containerEnemyDistantFighting:  null,
                    containerEnemy:                 null
                };

                this.stage = new pixi.Container();

                _.forEach(this.containers, function(value, key){
                    this.containers[key] = new pixi.Container();
                    this.stage.addChild(this.containers[key]);
                }, this);

                this.containers.containerInfighting.interactive = true;
                this.containers.containerInfighting.buttonMode = true;
                this.containers.containerDistantFighting.interactive = true;
                this.containers.containerDistantFighting.buttonMode = true;
                this.containers.containerEnemy.visible = false;

                this.setContainerPosition();

                this.containers.containerInfighting.hitArea = new pixi.Rectangle(0, 0, width / 1.5, oneLineHeight);
                this.containers.containerDistantFighting.hitArea = new pixi.Rectangle(0, 0, width / 1.5, oneLineHeight);
            }

            // nice work
            setContainerPosition(){
                let i = 4;
                _.forEach(this.containers, function(val, key){
                    this.containers[key].y = 0;
                    this.containers[key].x = 0;
                    this.containers[key].y = i * oneLineHeight;
                    i-=1;
                }, this);
            }
        }


        class Engine {

            constructor(loaderRes) {

                this.container = new Container();
                this.loaderRes = loaderRes;

                this.playerCollectionCard = new CardCollection(loaderRes, oneLineHeight, width);
                this.enemyCollectionCard = new CardCollection(loaderRes, oneLineHeight, width);

                let self = this;

                this.container.containers.containerInfighting
                    .on('mousedown', function(event){
                        self.onClickBattleField(event, self.container.containers.containerInfighting);
                    });

                this.container.containers.containerDistantFighting
                    .on('mousedown', function(event){
                        self.onClickBattleField(event, self.container.containers.containerDistantFighting);

                    });

                this.createDeck(this.container.containers.containerPlayer, this.playerCollectionCard);
                this.createDeck(this.container.containers.containerEnemy, this.enemyCollectionCard);

                this.setTouchEventCard(this.container.containers.containerPlayer);

                Backbone.on("AllRendered", function(renderer){
                    self.renderer = renderer;
                });

                Backbone.trigger("GameRender", this.container);

            }

            // nice work
            createDeck(container, collectionCard) {
                for (let i = 0; i < collectionCard.cardCollection.length; i+=1) {

                    collectionCard.cardCollection[i].cardStrite.x = collectionCard.cardCollection[i].cardStrite.width *
                        i + 2 * i + collectionCard.cardCollection[i].cardStrite.width/2;
                    collectionCard.cardCollection[i].cardStrite.y = collectionCard.cardCollection[i].cardStrite.y +
                        collectionCard.cardCollection[i].cardStrite.height/2;
                    collectionCard.cardCollection[i].cardStrite.anchor.set(0.5);
                    container.addChild(collectionCard.cardCollection[i].cardStrite);
                }
            }

            // nice work
            setTouchEventCard(container){
                if (container.children.length){
                    for (let i = 0; i < container.children.length; i+=1){
                        let card = container.getChildAt(i);
                        container.getChildAt(i)
                            .on('click', function(event) {
                                console.log(container.children.length);
                                this.onClickCard(event, container, card);
                            }, this)
                            .on('touchstart', function(event) {
                                this.onClickCard(event, container, card);
                            }, this);
                    }
                }
            }

            // maybe to do more nice
            onClickCard(event, container, card) {
                switch (event.data.originalEvent.which) {
                    case 1:
                        if (card.alpha === 0.5){
                            card.alpha = 1;
                            this.infoCard.renderable = false;
                            delete this.infoCard;
                            console.log(this.infoCard);
                            for (let i = 0; i < container.children.length; i+=1){
                                container.children[i].interactive = true;
                            }
                        }
                        else {
                            this.infoCard = new pixi.Sprite(card.texture);

                            for (let i = 0; i < container.children.length; i+=1){
                                container.children[i].interactive = false;
                            }
                            card.interactive = true;
                            card.alpha = 0.5;

                            this.infoCard.width = card.width * 2.5;
                            this.infoCard.height = card.height * 2.5;
                            this.infoCard.anchor.set(0.5);
                            this.infoCard.x = this.renderer.width - this.infoCard.width / 2;
                            this.infoCard.y = this.infoCard.height / 2;
                            this.infoCard.card = card;
                            this.container.stage.addChild(this.infoCard);
                        }
                        break;
                }
            }

            // nice work
            onClickBattleField(event, container){
                if (this.infoCard){
                    var card = new pixi.Sprite(this.infoCard.texture);

                    card.width = this.infoCard.width / 2.5;
                    card.height = this.infoCard.height / 2.5;
                    card.anchor.set(0);

                    card.x = container.children.length * card.width + 2;
                    card.y = 0;

                    container.addChild(card);
                    this.infoCard.renderable = false;
                    for (var i = 0; i < this.container.containers.containerPlayer.children.length; i+=1){
                        this.container.containers.containerPlayer.children[i].interactive = true;
                    }
                    this.container.containers.containerPlayer.removeChild(this.infoCard.card);
                    this.removeGapsInDeck(this.container.containers.containerPlayer);
                    this.AImove();
                }
            }

            // nice work
            removeGapsInDeck(container) {
                let wid;
                if (container.children.length){
                    wid = container.getChildAt(0).width;
                }
                for (let i = 0; i < container.children.length; i+=1){
                    container.getChildAt(i).x = wid * i + 2 + wid/2;
                }
            }

            AImove() {
                if (this.container.containers.containerEnemy.children.length) {
                    var card = this.container.containers.containerEnemy.getChildAt((Math.floor(Math.random() * (this.container.containers.containerEnemy.children.length))));
                    this.container.containers.containerEnemy.removeChild(card);
                    let r = Math.floor(Math.random() * (2) + 1);
                    if (r === 1){
                        this.container.containers.containerEnemyDistantFighting.addChild(card);
                        this.removeGapsInDeck(this.container.containers.containerEnemyDistantFighting);
                    }
                    else{
                        this.container.containers.containerEnemyInfighting.addChild(card);
                        this.removeGapsInDeck(this.container.containers.containerEnemyInfighting);
                    }
                }
            }



        }
        return Engine;
    }
);


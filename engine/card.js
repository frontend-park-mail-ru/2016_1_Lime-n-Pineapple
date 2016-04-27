"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

define(['pixi'], function (pixi) {
    var Card = function Card(loaderRes) {
        _classCallCheck(this, Card);

        //this.texture = new pixi.Texture.fromImage('static/resources/card' + (Math.floor(Math.random() * (8 - 1 + 1)) + 1) + '.png');
        this.texture = new pixi.Texture.fromImage(loaderRes['card' + (Math.floor(Math.random() * (8 - 1 + 1)) + 1)].url);
        this.cardStrite = new pixi.Sprite(this.texture);
        this.cardStrite.interactive = true;
        this.cardStrite.buttonMode = true;

        this.cardStrite.width = this.cardStrite.width * this.oneLineHeight * 1.2 / this.cardStrite.height;
        this.cardStrite.height = this.oneLineHeight;
    };

    return Card;
});

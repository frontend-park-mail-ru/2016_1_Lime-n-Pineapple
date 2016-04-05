'use strict';   
define([
    './main',
    './scoreboard',
    './game',
    './login',
    './logout',
    './block/btn_back'
], function(Main, Scoreboard, GameAction, Login, BtnBack) {
        return {
            main: Main,
            scoreboard: Scoreboard,
            game: GameAction,
            login: Login,
            btnBack: BtnBack
        };
    }
);

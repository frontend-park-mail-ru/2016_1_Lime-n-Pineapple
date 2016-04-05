'use strict';   
define([
    './main',
    './scoreboard',
    './game',
    './login',
    './logout',
    './block/btn_back'
], function(Main, Scoreboard, GameAction, Login, Logout, BtnBack) {
        return {
            main: Main,
            scoreboard: Scoreboard,
            game: GameAction,
            login: Login,
            logout: Logout,
            btnBack: BtnBack
        };
    }
);

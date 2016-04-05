define([
    'views/main',
    'views/scoreboard',
    'views/game',
    'views/login',
    'views/block/btn_back'
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

define([
    'views/main',
    'views/scoreboard',
    'views/game',
    'views/login',
    'views/logout',
    'views/block/btn_back'
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

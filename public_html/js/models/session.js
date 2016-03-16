/**
 * Created by Raaw on 05-Mar-16.
 */
define(
    ['backbone'],
    function (Backbone) {

        var Session = Backbone.Model.extend({
            defaults: { id: 0, game_room_id: 0, authorized: false },
            initialize: function () {
                console.log("[Session::initialize()]: begin to create");
            }


        });
        return Session;
    }
);
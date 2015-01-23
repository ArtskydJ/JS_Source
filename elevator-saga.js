{
    init: function(elevators, floors) {
        function rnd() {
            return elevators[Math.floor(Math.random() * elevators.length)]
        }
        elevators.forEach(function (elev, i) {
            elev.on('idle', function () {
                elev.goToFloor((elev.currentFloor() + i) % elevators.length + 1)
            }
        })

        floors.forEach(function (flr) {
            flr.on('up_button_pressed', function () {
                rnd().goToFloor( flr.floorNum() )
            })
            flr.on('down_button_pressed', function () {
                rnd().goToFloor( flr.floorNum() )
            })
        })
    },
    update: function(dt, elevators, floors) {}
}
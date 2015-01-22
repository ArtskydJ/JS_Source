{
    init: function(elevators, floors) {
        floors.forEach(function (flr) {
            flr.on('up_button_pressed', function onup() {
                //check for empty-enough elevators going up and past or to this floor
                var find = elevators.map(function (elev) {
                    return (
                        (elev.goingUpIndicator()? 100 : 1) *
                        (4 - Math.round(elev.loadFactor * 4))
                    )
                }).reduce(function (memo, curr, i) {
                    return (curr > memo.like) ? {elev: i, like: curr} : memo
                }, {elev:0, like:0})
                console.log(find)
                elevators[ find.elev ].goToFloor( flr.floorNum() )
            })
            flr.on('down_button_pressed', function onup() {
                //check for empty-enough elevators going up and past or to this floor
                var find = elevators.map(function (elev) {
                    return (
                        (elev.goingDownIndicator()? 100 : 1) *
                        (4 - Math.round(elev.loadFactor * 4))
                    )
                }).reduce(function (memo, curr, i) {
                    return (curr > memo.like) ? {elev: i, like: curr} : memo
                }, {elev:0, like:0})
                console.log(find)
                elevators[ find.elev ].goToFloor( flr.floorNum() )
            })
        })
    },
    update: function(dt, elevators, floors) {}
}
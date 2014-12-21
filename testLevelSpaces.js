var spaces = require('level-spaces')
var level = require('level-mem')

function fakeJlc(db) {
	var one = spaces(db, 'one')
	var two = spaces(db, 'two')
	var three = spaces(db, 'three')
	one.put('hullo?', 'this is one speaking')
	two.put('hello?', 'this is two speaking')
	three.put('HELLO!?!', 'this is three speaking')
}

(function main() {
	var db = level('/does/not/matter')
	var one = spaces(db, 'one')
	var two = spaces(db, 'two')
	var three = spaces(db, 'three')
	db.on('put', console.log.bind(console, 'db.on(\'put\') ='))
	one.on('put', console.log.bind(console, 'one.on(\'put\') ='))     //note that this never fires.
	two.on('put', console.log.bind(console, 'two.on(\'put\') ='))     //note that this never fires.
	three.on('put', console.log.bind(console, 'three.on(\'put\') =')) //note that this never fires.
	fakeJlc(db)
	setTimeout(function () {}, 100)
})()
var SPACES = true
var level = require('level-mem')
var db = level('whatever')
var sub = null

if (SPACES) {
	var Spaces = require('level-spaces')
	sub = Spaces(db, 'stuff', { separator: '!' })
} else {
	var Sublevel = require('level-sublevel')
	sub = Sublevel(db).sublevel('stuff')
}

db.put('hello', 'world', function (err) {
	if (err) throw err

	sub.put('hello', 'world', function (err) {
		if (err) throw err

		db.get('!stuff!hello', function (err, val) {
			console.log(err, val)

			var stream = db.createReadStream()

			stream.on('data', function (data) {
				console.log(data)
			})
		})
	})
})

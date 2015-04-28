var Level = require('level-mem')
var sublevel = require('level-sublevel')
var after = require('after')

var db = sublevel(Level('hey'))
var sub = db.sublevel('sup')

var step = after(6, finish)

db.put('thing', 'value', step)
db.put('thingie', 'cool', step)
db.put('thingy', 'supes', step)
sub.put('thingy', 'value', step)
sub.put('thingie', 'valz', step)
sub.put('thing', 'wat', step)

function finish(err) {
	db.createReadStream().on('data', function (data) {
		console.log(data.key + ' -> ' + data.value)
	}).on('end', function () {
		sub.createReadStream().on('data', function (data) {
			console.log('sub ' + data.key + ' -> ' + data.value)
		})
	})
}

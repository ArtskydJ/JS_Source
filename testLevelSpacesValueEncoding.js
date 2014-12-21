var spaces = require('level-spaces')
var level = require('level-mem')
var test = require('tap').test

test('spaces works with json valueEncoding option', function (t) {
	var thing = {
		one: 'two',
		three: 'four'
	}
	var db = level('w00t')
	var jsonThings = spaces(db, 'json-things', {valueEncoding: 'json'})

	jsonThings.put('thing', thing, function (err) {
		t.notOk(err, 'put() did not return an error')
		jsonThings.get('thing', function (err, got) {
			t.notOk(err, 'get() did not return an error')
			t.ok(got, 'got something back!')
			t.type(got, 'object', 'got back an object')
			t.deepEqual(got, thing, 'got back the right thing')
			t.end()
		})
	})
})

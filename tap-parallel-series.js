require('domready')(function () {

	var test = require('tape')

	test('one', function (t) {
		console.log('one')
		window.location.hash = 'one'
		setTimeout(function () {
			console.log('one ending')
			t.end()
		}, 1000)
	})

	test('two', function (t) {
		console.log('two')
		window.location.hash = 'two'
		setTimeout(function () {
			console.log('two ending')
			t.end()
		}, 800)
	})

	test('three', function (t) {
		console.log('three')
		window.location.hash = 'three'
		setTimeout(function () {
			console.log('three ending')
			t.end()
		}, 600)
	})

	test('four', function (t) {
		console.log('four')
		window.location.hash = 'four'
		setTimeout(function () {
			console.log('four ending')
			t.end()
		}, 400)
	})

	test('five', function (t) {
		console.log('five')
		window.location.hash = 'five'
		setTimeout(function () {
			console.log('five ending')
			t.end()
			quit()
		}, 200)
	})

	function quit() {
		console.log('closing')
		window.close()
	}

	var unref = setTimeout(quit, 4000).unref
	unref && unref()

})

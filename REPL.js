var map = require('through2-map')

process.stdin
	.pipe(map({wantStrings:true}, function (data) {
		return eval(data)
	}))
	.pipe( process.stdout )

//process.on('uncaughtException', function dontCare() {})

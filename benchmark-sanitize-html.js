var Benchmark = require('benchmark')
var sanitize170 = require('sanitize-html')
var sanitizeArray = require('../sanitize-html/index.js')
var sanitizeMap = require('../sanitize-html/map-version.js')
var sanitizeArray2 = require('../sanitize-html/index-of-version.js')

var shortHtml = '<html><head></head><body></body></html>'
var longHtml = require('fs').readFileSync('../justlogin.xyz/static/index.html', 'utf8')
// longHtml hosted here: https://gist.github.com/ArtskydJ/b330dfae9316b6c8d7dd
var mediumHtml = longHtml.slice(longHtml.length/2)

new Benchmark.Suite()
	.add('short 1.7.0', function () { sanitize170(shortHtml) })
	.add('short includes', function () { sanitizeArray(shortHtml) })
	.add('short indexof', function () { sanitizeArray2(shortHtml) })
	.add('short maps', function () { sanitizeMap(shortHtml) })
	.add('medium 1.7.0', function () { sanitize170(mediumHtml) })
	.add('medium includes', function () { sanitizeArray(mediumHtml) })
	.add('medium indexof', function () { sanitizeArray2(mediumHtml) })
	.add('medium maps', function () { sanitizeMap(mediumHtml) })
	.add('long 1.7.0', function () { sanitize170(longHtml) })
	.add('long includes', function () { sanitizeArray(longHtml) })
	.add('long indexof', function () { sanitizeArray2(longHtml) })
	.add('long maps', function () { sanitizeMap(longHtml) })
	.on('cycle', function(event) { console.log(String(event.target)) })
	.on('complete', function() { console.log('Fastest is ' + this.filter('fastest').pluck('name')) })
	.run({ async: true })


/*
array fork
==========



map fork
========


*/

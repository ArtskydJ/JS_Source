var Benchmark = require('benchmark')
require('array-includes').shim()

var map = { a: true, b: true, c: true, d: true, e: true }
var arr = [ 'a', 'b', 'c', 'd', 'e' ]
var set = new Set(arr)

var suite = new Benchmark.Suite
suite.add('set', function () {
	set.has('a')
	set.has('z')
}).add('arr.includes', function () {
	arr.includes('a')
	arr.includes('z')
}).add('arr.indexof', function () {
	arr.indexOf('a') !== -1
	arr.indexOf('z') !== -1
}).add('map', function () {
	map['a']
	map['z']
}).add('map 2', function () {
	map && map['a']
	map && map['z']
}).on('cycle', function(event) {
	console.log(String(event.target))
}).on('complete', function() {
	console.log('Fastest is ' + this.filter('fastest').pluck('name'))
}).run({ async: true })

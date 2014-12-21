// This program will find the sets in a given an array of "cards".
// https://en.wikipedia.org/wiki/Set_%28game%29
// A card is formatted like {count:3, shading:'striped', color:'green', symbol:'diamond'}
// Internally a card is formatted like [3, 2, 2, 1] (order is important)

var range = require('./range.js')

var externalizeShading = {
	1: 'filled',
	2: 'striped',
	3: 'empty'
}
var externalizeColor = {
	1: 'red',
	2: 'green',
	3: 'purple'
}
var externalizeSymbol = {
	1: 'diamond',
	2: 'squiggle',
	3: 'oval'
}
var toNum = {
	filled: 1, red: 1, diamond: 1,
	striped: 2, green: 2, squiggle: 2,
	empty: 3, purple: 3, oval: 3
}

function generateArrs(x) {
	return range(1, x).map(generateArr)
}
function generateArr() {
	return range(1, 4).map(rand)
}
function rand() {
	return Math.floor(Math.random() * 3) + 1
}

function objToArr(cardObj) {
	return [
		cardObj.count,
		toNum[cardObj.shading],
		toNum[cardObj.color],
		toNum[cardObj.symbol]
	]
}

function arrToObj(cardArr) {
	return {
		count: parseInt(cardArr[0]),
		shading: externalizeShading[cardArr[1]],
		color: externalizeColor[cardArr[2]],
		symbol: externalizeSymbol[cardArr[3]]
	}
}

function getMissingArr(arr1, arr2) {
	return range(0, 3).map(function (i) {
		return missing(arr1[i], arr2[i])
	})

	function missing(x, y) {
		return 3 - (x + y) % 3
	}
}

function stringizeObj(cardObj) {
	return [
		cardObj.count,
		cardObj.shading,
		cardObj.color,
		cardObj.symbol + ((cardObj.count == 1) ? '' : 's')
	].join(' ')
}

function stringizeArr(cardArr) {
	return stringizeObj( arrToObj(cardArr) )
}

function printObjs(cardObjs) {
	console.log( cardObjs.map(stringizeObj).join('\n') )
}

function printArrs(cardArrs) {
	console.log( cardArrs.map(stringizeArr).join('\n') )
}

var arrs = generateArrs(2)
arrs.push( getMissingArr(arrs[0], arrs[1]) )

printArrs(arrs)

/*
//test random generator
var count = [null, 0, 0, 0, null]
for(var i=0; i<3000; i++) {
	count[rand()]++
}
console.dir(count)
*/

/*
To Do
- create repo for this project
- split the obj stuff into its own file
	and the arr stuff into its own file
- create tests for this stuff

Probably won't do
- make/find shape detection lib.
	- detects an svg inside a jpeg, png, bmp or gif
https://en.wikipedia.org/wiki/Edge_detection
https://en.wikipedia.org/wiki/Computer_vision
https://en.wikipedia.org/wiki/Template_matching
*/

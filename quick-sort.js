var LENGTH = 10
var array = new Array(LENGTH)

var methods = {
	shuffle: function shuffle(arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i] = Math.floor(Math.random()*arr.length)
		}
	},
	sorted: function sorted(arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i] = i
		}
	},
	reversed: function reversed(arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i] = arr.length - i
		}
	},
	fewUnique: function fewUnique(arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i] = Math.floor(Math.random()*4)
		}
	},
	almostSorted: function almostSorted(arr) {
		for (var i = 0; i < arr.length; i++) {
			arr[i] = i
		}
		arr[arr.length-1] = Math.floor(arr.length/2)
	}
}

function median(a, b, c) {
	if ((b <= a && a <= c) || (c <= a && a <= b)) return a
	if ((a <= b && b <= c) || (c <= b && b <= a)) return b
	if ((a <= c && c <= b) || (b <= c && c <= a)) return c
}
var n=0
function quicksort(arr) {
	if (arr.length === 0) {
		return []
	}
	if (arr.length === 1) {
		return arr[0]
	}

	var pivot = median(arr[0], arr[Math.floor(arr.length/2)], arr[arr.length-1])
	console.log('pivot', pivot)
	var x = arr.reduce(function (memo, curr) { //this is gonna be dumb slow
		memo[curr>pivot].push(curr)
		return memo
	}, {true:[], false:[]})
	n++//console.log(n++)
	if (n>200) return []
	console.log(quicksort(x[true]))
	console.log(quicksort(x[false]))
	return [].concat(
		quicksort(x[true]),
		quicksort(x[false])
	)
}

console.time('shuffled')
methods.shuffle(array)
console.timeEnd('shuffled')
console.log(array)
console.time('sorted')
var sorted = quicksort(array)
console.timeEnd('sorted')

//console.dir(array)
console.dir(sorted)


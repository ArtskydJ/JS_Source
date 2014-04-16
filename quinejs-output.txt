var l = [
	"var l = [",
	"]",
	"var d = [0, 0, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]",
	"var b = [0, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0]",
	"for (var i=0; i<d.length; i++) {",
	"	console.log((b[i]?String.fromCharCode(9,34):'') + l[d[i]] + (b[i]?String.fromCharCode(34)+(b[i]<2?',':''):''))",
	"}"
]
var d = [0, 0, 1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6]
var b = [0, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0]
for (var i=0; i<d.length; i++) {
	console.log((b[i]?String.fromCharCode(9,34):'') + l[d[i]] + (b[i]?String.fromCharCode(34)+(b[i]<2?',':''):''))
}
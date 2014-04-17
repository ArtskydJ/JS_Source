var lines = [
	"var lines = [",
	"]",
	"var lineOrder  = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]",
	"var printQuote = [0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0]",
	"for (var i in lineOrder) {",
	"	console.log((printQuote[i]?String.fromCharCode(9,34):'')",
	"		+ lines[lineOrder[i]]",
	"		+ (printQuote[i]?String.fromCharCode(34)+(printQuote[i]<2?',':''):''))",
	"}"
]
var lineOrder  = [0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]
var printQuote = [0, 1, 1, 1, 1, 1, 1, 1, 1, 2, 0, 0, 0, 0, 0, 0, 0, 0]
for (var i in lineOrder) {
	console.log((printQuote[i]?String.fromCharCode(9,34):'')
		+ lines[lineOrder[i]]
		+ (printQuote[i]?String.fromCharCode(34)+(printQuote[i]<2?',':''):''))
}
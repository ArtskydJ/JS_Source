var lines = [
	"var lines = [",
	"]",
	"var tab = String.fromCharCode(9)",
	"var newline = String.fromCharCode(10)",
	"var quote = String.fromCharCode(34)",
	"lines.forEach(function (line, i) {",
	"	console.log(line)",
	"	if (!i) console.log(lines.map(line2 => tab + quote + line2 + quote).join(',' + newline))",
	"})"
]
var tab = String.fromCharCode(9)
var newline = String.fromCharCode(10)
var quote = String.fromCharCode(34)
lines.forEach(function (line, i) {
	console.log(line)
	if (!i) console.log(lines.map(line2 => tab + quote + line2 + quote).join(',' + newline))
})

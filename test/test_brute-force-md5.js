var Brute = require('../brute-force-md5.js')

var brute = Brute({
	lettersUpper: false, //true
	lettersLower: false, //true
	numbers: true, //false
	special: false,
	whitespace: false, //true
	maxLen: 12
})

//var hw = brute('5eb63bbbe01eeed093cb22bb8f5acdc3')
var hw = brute('cb07901c53218323c4ceacdea4b23c98')
//var hw = brute('363b122c528f54df4a0446b6bab05515')

if (hw instanceof Error)
	console.log("err:", hw.message)
else
	console.log("hw:", hw)

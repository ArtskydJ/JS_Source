var Brute = require('../brute-force-md5.js')
var brute = Brute({
	lettersUpper: false, //true
	lettersLower: true, //true
	numbers: true, //false
	special: false,
	whitespace: false, //true
	maxLen: 5
})

//generate or iterate might have an issue with 1 character length strings!!!

var um = ''
var time = process.hrtime();
switch(4) {
	case 1: um = brute('5eb63bbbe01eeed093cb22bb8f5acdc3'); break //hello world
	case 2: um = brute('cb07901c53218323c4ceacdea4b23c98'); break //joseph
	case 3: um = brute('363b122c528f54df4a0446b6bab05515'); break //j
	case 4: um = brute('05298fdb6c0c3d665cea702d1f85acda'); break //10124
	case 5: um = brute('8ff32489f92f33416694be8fdc2d4c22'); break //joe
	default: um = Error('Invalid number entered into switch.'); break
}
var diff = process.hrtime(time);
console.log('Brute force took %d.%d nanoseconds', diff[0], diff[1]);

if (um instanceof Error)
	console.log("err:", um.message)
else
	console.log(um)

var crypto = require('crypto')
var xtend = require('xtend')

var defaultOpts = {
	lettersUpper: true,
	lettersLower: true,
	numbers: true,
	special: false,
	whitespace: true,
	maxLen: 8
}
var strs = {
	lettersUpper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
	lettersLower: 'abcdefghijklmnopqrstuvwxyz',
	numbers: '1234567890',
	special: '`~!@#$%^&*()-_=+|\\;:\'",.<>[]{}/?',
	whitespace: ' '
}

function optsToArray(opts) {
	var result = ''
	if (opts.lettersUpper)	result += strs.lettersUpper
	if (opts.lettersLower)	result += strs.lettersLower
	if (opts.numbers)		result += strs.numbers
	if (opts.special)		result += strs.special
	if (opts.whitespace)	result += strs.whitespace
	console.log("result string: '%s'", result)
	return result.split('')
}

function md5(str) {
	return crypto.createHash('md5').update(str).digest('hex')
}

function increment(um, arr, depth, hash) {
	if (um.length!=depth)        //if not target depth
		um += "x"                //add useless
	return arr.some( function(ele) {
		um = um.slice(0, -1)     //cut (useless?)
		um += ele                //add
		if (um.length!=depth)    //if not target depth
			increment(um, arr, depth) //increment now
		console.log("um: '%s'", um)

		return (md5(um) === hash)				
	})
}

module.exports = function Brute(constructorOpts) {
	return function brute(hash, thisOpts) {
		var opts = xtend(defaultOpts, constructorOpts, thisOpts)
		console.log('opts', opts)
		var chars = optsToArray( opts )
		var result = '2'
		var done = false
		opts.maxLen = 5 //yo this is not supposed to stay
		for (var depth = 1; !done && depth<opts.maxLen; depth++) {
			console.log("depth:", depth)
			done = increment(result, chars, depth, hash)
			/*
			increment
			if not first time:
				(do again)
			else
				check
			*/
		}
		return result
	}
}

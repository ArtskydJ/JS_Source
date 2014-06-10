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
	numbers: '0123456789',
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
	//console.log("chars: '%s'", result)
	return result.split('')
}

function strEqualsHash(str, hash) {
	function md5(string) {
		return crypto.createHash('md5').update(string).digest('hex')
	}
	return (md5(str) === hash)
}

function generate(length, chars) {
	var res = chars[0]
	for(var i=1; i<length; i++) {
		res += chars[0]
	}
	return res
}

function replaceNextChar(str, ind, chars) {
	function nextChar(str, ind, chars) {
		var strChar = str.charAt(ind)
		var charIndex = chars.indexOf(strChar)
		return {
			chr: chars[(charIndex+1)%chars.length],
			end: (charIndex === chars.length-1)
		}
	}

	function replaceChar(str, ind, newChar) {
		var t1 = str.slice(0, ind)
		var t2 = str.slice(ind+1)
		return t1 + newChar + t2
	}

	var nc = nextChar(str, ind, chars)
	return {
		str: replaceChar(str, ind, nc.chr),
		end: nc.end
	}
}

module.exports = function Brute(constructorOpts) {
	return function brute(hash, thisOpts) {
		var opts = xtend(defaultOpts, constructorOpts, thisOpts)
		var chars = optsToArray( opts )
		var result = ''

		for(var len=1; len<=opts.maxLen && !strEqualsHash(result, hash); len++) {
			result = generate(len, chars)

			for(var i=0; i<Math.pow(chars.length, len+1) && !strEqualsHash(result, hash); i++) {
				var rnc = {end:true}
				for(var chrInd = len; rnc.end; chrInd--) { // && chrInd>=0
					rnc = replaceNextChar(result, chrInd, chars)
					result = rnc.str
				}

				//console.log('result: %s\t%s', result, (chrInd<0)?'MOD':'rnc') //chrInd is out of scope
			}
			//console.log('len:', len)
		}
		//console.log('done')
		return result
	}
}


/*
TODO
		if result[immodifyingthis] is small ehough
			bump result[immodifyingthis]
		if result[immodifyingthis] is at the end (determined by chars.length)
			set result[immodifyingthis]  to the 1st indx/chrs, e.g. '1' or 'A'
			if immodifyingthis isnt 0
				subtract 1 from immodifyingthis
			but if it is 0
				break to original 'for' loop?


*/

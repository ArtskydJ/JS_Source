var md5 = require('md5-jkmyers')
var xtend = require('xtend')
var chars = []

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

function generate(length) {
	var res = chars[0]
	for(var i=1; i<length; i++)
		res += chars[0]
	return res
}

function Rnc(str, charEnd, veryEnd) {
	if (typeof str === 'object')
		return {
			str: (str.str || ''),
			charEnd: (str.charEnd || false),
			veryEnd: (str.veryEnd || false)
		}
	else
		return {
			str: (str || ''),
			charEnd: (charEnd || false),
			veryEnd: (veryEnd || false)
		}
}

function nextChar(str, ind) {
	var charIndex = chars.indexOf(str.charAt(ind))
	return {
		chr: chars[(charIndex+1)%chars.length],
		end: (charIndex >= chars.length-1)
	}
}

function replaceChar(str, ind, newChar) {
	var t1 = str.slice(0, ind)
	var t2 = str.slice(ind+1)
	return t1 + newChar + t2
}

function replaceNextChar(str, ind) {
	var nc = nextChar(str, ind)
	var tStr = replaceChar(str, ind, nc.chr)
	if (nc.end) {
		if (ind===0)
			tStr = generate(tStr.length+1)
		else
			tStr = replaceNextChar(tStr, ind-1, nc.chr).str //not sure about nc.chr in this context
	}
	return {
		str: tStr,
		charEnd: nc.end,
		veryEnd: nc.end && ind===0
	}
}

function iterate(hash, maxLen) {
	var rnc = new Rnc(chars[0])
	var status = {running: true, foundHash: false}
	var ind = 0

	for(var x=0; status.running; x++) {
		rnc = replaceNextChar(rnc.str, ind)
		ind = rnc.str.length-1

		if (md5(rnc.str)===hash) {
			status.running = false
			status.foundHash = true
		} else if (rnc.veryEnd) {
			if (rnc.str.length>=maxLen)
				status.running = false
		}
	}
	return rnc.str
}

module.exports = function Brute(constructorOpts) {
	return function brute(hash, thisOpts) {
		var opts = xtend(defaultOpts, constructorOpts, thisOpts)
		chars = optsToArray( opts )
		return iterate(hash, opts.maxLen)
	}
}

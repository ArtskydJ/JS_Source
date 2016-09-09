// http://stackoverflow.com/questions/117812/alternate-fizzbuzz-questions
// Reverse a string
function stringReverse(str) {
	return str.split('').reverse().join('')
}

console.log(stringReverse('12345') === '54321')

// Reverse a sentence ("bob likes dogs" -> "dogs likes bob")
function sentenceReverse(str) {
	return str.split(' ').reverse().join(' ')
}

console.log(sentenceReverse('bob likes dogs') === 'dogs likes bob')

// Find the minimum value in a list
function minValueInArray(arr) {
	return Math.min.apply(null, arr)
}

console.log(minValueInArray([ 1, 2, 3 ]) === 1)

// Find the maximum value in a list
function maxValueInArray(arr) {
	return Math.max.apply(null, arr)
}

console.log(maxValueInArray([ 1, 2, 3 ]) === 3)

// Calculate a remainder (given a numerator and denominator)
function remainder(numerator, denominator) {
	return numerator % denominator
}

console.log(remainder(11, 3) === 2)

// Return distinct values from a list including duplicates (i.e. "1 3 5 3 7 3 1 1 5" -> "1 3 5 7")
function distinct(arr) {
	return arr.filter(function (val, index) {
		return arr.indexOf(val) === index
	})
}

console.log(distinct([ 1, 3, 5, 3, 7, 3, 1, 1, 5 ]).join(',') === '1,3,5,7')

// Return distinct values and their counts (i.e. the list above becomes "1(3) 3(3) 5(2) 7(1)")
function distinctCounts(arr) {
	var map = {}
	arr.forEach(function (val) {
		if (map[val] === undefined) map[val] = 0
		map[val]++
	})
	return map
}

console.log(JSON.stringify(distinctCounts([ 1, 3, 5, 3, 7, 3, 1, 1, 5 ])) === '{"1":3,"3":3,"5":2,"7":1}')

// Given a string of expressions (only variables, +, and -) and a set of variable/value pairs (i.e. a=1, b=7, c=3, d=14) return the result of the expression ("a + b+c -d" would be -3).
function evaluate(vars, expression) {
	var parsed = expression.split(/\s+|\b/g)
	var result = vars[parsed[0]]
	for (var i = 1; i < parsed.length; i += 2) {
		result += vars[parsed[i + 1]] * (parsed[i] === '-' ? -1 : 1)
	}
	return result
}

console.log(evaluate({ a: 1, b: 7, c: 3, d: 14 }, 'a + b+c -d') === -3)

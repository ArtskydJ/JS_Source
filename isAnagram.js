function isAnagram(w1, w2) {
	if (w1.length !== w2.length) return false

	for (var i = 0; i < w1.length; i++) {
		var index = w2.indexOf(w1[i])
		if (index === -1) return false
		w2 = w2.slice(0, index) + w2.slice(index + 1)
	}
	return true
}

console.log(isAnagram('aab', 'aba'))
console.log(!isAnagram('a', 'aaa'))
console.log(!isAnagram('aaa', 'a'))
console.log(!isAnagram('aab', 'abb'))

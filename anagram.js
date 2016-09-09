function anagram(w1, w2) {
	if (w1.length !== w2.length) {
		return false
	}

	for (var i = 0; i < w1.length; i++) {
		var w2chrIdx = w2.indexOf(w1[i])
		if (w2chrIdx === -1) {
			return false
		}
		w2 = w2.slice(0, w2chrIdx) + w2.slice(w2chrIdx + 1)
	}

	return true
}

console.log(anagram(process.argv[2], process.argv[3]))

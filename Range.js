module.exports = function range(low, high) {
	if (!high) {
		high = low
		low = 0
	}
	var rev = false
	if (low > high) {
		var t = high
		high = low
		low = t
		rev = true
	}
	
	var result = []
	for (var i=low; i<=high; i++) {
		rev?
			result.unshift(i) :
			result.push(i)
	}

	return result
}

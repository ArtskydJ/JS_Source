function* countTo(n) {
	for(var i=0; i<n-1; i++) {
		yield i
	}
	return n-1
}

var countToNine = countTo(9)
var returned = {}
while(!returned.done) {
	returned = countToNine.next()
	console.log(returned.value)
}

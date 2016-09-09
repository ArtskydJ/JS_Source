function boxSize(cm1, cm2, cm3) {
	return ((cm1 * cm2 * cm3) / 1000) - 1
}

console.log(boxSize(10,10,10) === 0)
console.log(boxSize(0,0,0) === -1)
console.log(boxSize(100,10,10) === 9)

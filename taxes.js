function taxes(dollars, percent) {
	return [dollars * percent]
}

console.log(taxes(10, 50)[0] === 500)
console.log(taxes(10, 10)[0] === 100)
console.log(taxes(1, 1)[0] === 1)

var obj = { joe:4, lee:8, dyk:2 }

console.log(obj)
Object.keys(obj).forEach(function (IN) {
	console.log(obj[IN])
})

obj["joseph"] = 42 //The answer to life, the universe, and everything

console.log(obj)
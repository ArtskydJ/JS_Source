setInterval(function () {
	var i = 0;
	var iv = setInterval(function () {
		for (var j = 0; j < 30; j++) {
			console.log((i % 2) ? '███████████████████████████████████████████████████████████████████████████████████████████████████' : '')
		}
		if (i++ >= 16) {
			clearInterval(iv)
		}
	}, 200)
}, 10 * 60 * 1000)

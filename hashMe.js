var md5 = require('crypto').createHash('md5')
var fs = require('fs')
fs.createReadStream('./hashMe.txt')
	.on('data', function(d) {
		md5.update(d)
	})
	.on('end', function() {
		var hash = md5.digest('hex')
		console.log("Hash:\n"+hash);
	})

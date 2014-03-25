var shasum = require('crypto').createHash('md5')

require('fs').ReadStream('./hashMe.txt').on('data', function(d) {
	shasum.update(d)
}).on('end', function() {
	var hash = shasum.digest('hex')
    console.log("Hash:\n"+hash);
})
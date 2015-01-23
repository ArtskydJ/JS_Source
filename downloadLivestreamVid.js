var request = require('request')
var fs = require('fs')
var sources = [
	'http://livestreamvod-f.akamaihd.net/events/00000000002be213/1a84dbda-ecdb-4355-aba2-ff1ebd011bdd_2096.mp4',
	'http://livestreamvod-f.akamaihd.net/events/00000000002be213/592ceee2-3c81-4742-af86-f3fbeed08c58_2096.mp4'
]
var destDir = 'C:\\Users\\Michael\\Desktop\\Joseph\\Temporary\\Livestream'
if (!fs.existsSync(destDir)) {
	throw Error("Path does not exist:",destDir)
}
sources.forEach(function (source) {
	var filename = source.split('/').pop()
	console.log('Creating', filename, 'from', source)
	request(source).pipe(fs.createWriteStream(destDir+'\\'+filename))
})

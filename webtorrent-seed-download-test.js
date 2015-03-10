var WebTorrent = require('webtorrent')
var torrenter = new WebTorrent()

// https://github.com/feross/instant.io/blob/master/client/index.js#L40
var opts = {
	announce: [
		'udp://tracker.webtorrent.io:80',
		'udp://tracker.webtorrent.io:80'
	]
}

torrenter.seed('./ignore/01 Outsiders.mp3', opts, function (torr) {
	console.log('Seeding ' + torr.infoHash.slice(0, 8))
	torrenter.download(torr.infoHash, function (torrent) {
		console.log('Downloading ' + torr.infoHash.slice(0, 8))
	})
})

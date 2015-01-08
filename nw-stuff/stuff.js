process.env.debug = 'webtorrent'
var Webtorrent = require('webtorrent')
var append = null

if (!process.env.CHROME_ALLOCATOR) { //in node
	append = function (str) {
		console.log(str)
	}
} else { //in node webkit
	append = function (str) {
		document.getElementById('log').innerHTML += str + '<br>'
	}
}

append('In node webkit: ' + !!process.env.CHROME_ALLOCATOR)
var torrenter = new Webtorrent()
var infoHash = true ? //true = torrent, false = webtorrent
	'rebdfle2ntxy3stts4pxpvalrrenavkj' : //instant.io
	'31f78f61e2c3e62655826abf2151784cd92f39e5' //NOOBS_LITE

var tor = torrenter.download(infoHash, function (torrent) {
	append('yay yay yay: ' + (torrent && torrent.infoHash))
})

setInterval(function () {
	append(
		'Ratio: ' + tor.ratio +
		'\tConnections: ' + tor.numConns +
		'\tPeers: ' + tor.numPeers
	)
}, 10 * 1000)

//instant.io: 31f78f61e2c3e62655826abf2151784cd92f39e5
//NOOBS_LITE: rebdfle2ntxy3stts4pxpvalrrenavkj

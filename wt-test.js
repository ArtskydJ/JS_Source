var wt = require('webtorrent')
var fs = require('fs')

var torrenter = new wt()
var magnet = 'magnet:?xt=urn:btih:rebdfle2ntxy3stts4pxpvalrrenavkj' +
	'&dn=NOOBS_lite_v1_3_10.zip&xl=20934199&fc=1'

torrenter.download(magnet, function (torrent) {
	var file = torrent.file[0]
	var src = file.createReadStream()
	var dest = fs.createWriteStream()
	src.pipe(dest)
})

setTimeout( torrenter.destroy.bind(torrenter), 1000 )


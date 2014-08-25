//https://github.com/substack/dnode
//Code copied from the readme
//build like so:
//browserify NAME.js -o static/NAME.js

var domready = require('domready');
var shoe = require('shoe');
var dnode = require('dnode');

domready(function () {
    var stream = shoe('/dnode');

    var d = dnode();
    d.on('remote', function (remote) {
        window.wuzzup = remote.wuzzup.bind(remote);
		remote.transform('beep', function (s) {
			console.log('beep => ' + s);
			//d.end();
		})
    });
    d.pipe(stream).pipe(d);
});

window.globalFunction = function globalFunction() {
	
	if (window.wuzzup) {
		window.wuzzup(function(str) {
			console.log(str)
		})
	} else
		throw new Error("window wuzzup is not existent")
}

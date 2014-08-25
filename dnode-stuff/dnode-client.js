//https://github.com/substack/dnode
//Code copied from the readme

var dnode = require('dnode');

var d = dnode.connect(5004);
d.on('remote', function (remote) {
	window.wuzzup = remote.wuzzup
    remote.transform('beep', function (s) {
        console.log('beep => ' + s);
        d.end();
    });
	
});

function globalFunction() {
	if (window.wuzzup) {
		window.wuzzup(function(str) {
			console.log(str)
		})
	} else
		throw new Error("window wuzzup is not existent")
}

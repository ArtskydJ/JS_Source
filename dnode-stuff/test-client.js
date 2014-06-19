//https://github.com/substack/dnode
//Code copied from the readme

var dnode = require('dnode');

var d = dnode.connect(8080);
d.on('remote', function (remote) {
    remote.transform('beep', function (s) {
        console.log('beep => ' + s);
        d.end();
    });
});

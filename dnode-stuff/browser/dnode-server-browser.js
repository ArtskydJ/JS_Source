//https://github.com/substack/dnode
//Code copied from the readme, and modified

var http = require('http');
var shoe = require('shoe');
var ecstatic = require('ecstatic')(__dirname + '/static');
var dnode = require('dnode');

var server = http.createServer(ecstatic);
server.listen(9999);

var sock = shoe(function (stream) {
    var d = dnode({
        transform : function(s, cb) {
            var res = s.replace(/[aeiou]{2,}/, 'oo').toUpperCase();
            cb(res);
        },
        wuzzup : function(cb) {
        	console.log('they called "wuzzup"')
        	cb()
        }
    });
    d.pipe(stream).pipe(d);
});
sock.install(server, '/dnode');

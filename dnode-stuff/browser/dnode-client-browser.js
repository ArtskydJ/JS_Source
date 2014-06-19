//https://github.com/substack/dnode
//Code copied from the readme
//build like so:
//browserify NAME.js -o static/NAME.js

var domready = require('domready');
var shoe = require('shoe');
var dnode = require('dnode');

domready(function () {
    var result = document.getElementById('result');
    var wuzzup = document.getElementById('wuzzup')
    var stream = shoe('/dnode');

    if (wuzzup) //if button pressed
    	remote.whatIsUp()

    var d = dnode();
    d.on('remote', function (remote) {
        remote.transform('beep', function (s) {
            result.textContent = 'beep => ' + s;
        });
    });
    d.pipe(stream).pipe(d);
});

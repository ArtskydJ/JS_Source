﻿//https://github.com/substack/dnode
//Code copied from the readme

var dnode = require('dnode');
var server = dnode({
    transform : function (s, cb) {
        cb(s.replace(/[aeiou]{2,}/, 'oo').toUpperCase())
    }
});
server.listen(8080);

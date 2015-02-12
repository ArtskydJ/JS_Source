var http = require('http')

var server = http.createServer()

server.listen(80)

server.on('request', function (request, response) {
	response.write('<h1>Hello World!</h1>')
	response.end()
})

// Open your browser to http://localhost and view the awesome

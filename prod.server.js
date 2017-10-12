// var express = require('express')
// var config = require('./config/index')
// var app = express()
//   // 端口
// app.use(express.static('./dist'))
// var port = process.env.PORT || config.build.port
// module.exports = app.listen(port, function(err) {
//   if (err) {
//     console.log(err)
//     return
//   }
//   console.log('Listening at http://localhost:' + port + '\n')
// })
const http = require('http')
const fs = require('fs')
const httpPort = 80
http.createServer((req, res) => {
  fs.readFile('index.htm', 'utf-8', (err, content) => {
    if (err) {
      console.log('We cannot open "index.htm" file.')
    }

    res.writeHead(200, {
      'Content-Type': 'text/html; charset=utf-8'
    })

    res.end(content)
  })
}).listen(httpPort, () => {
  console.log('Server listening on: http://localhost:%s', httpPort)
})
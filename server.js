const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');
const port = process.argv[2]
if (!port) {
  console.log("请输入端口参数：node server.js 端口");
  process.exit(1)
}
const server = http.createServer((req, res) => {
  var parseUrl = url.parse(req.url)
  var { path: pathWithQuery, query, pathname } = parseUrl
  var method = req.method
  console.log(`收到请求！路径（带查询参数）为：${pathWithQuery}`);
  path.join(__dirname, "/static/", pathname)
  if (pathname === "/") {
    fs.readFile("static/index.html", "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        res.statusCode = 404
      } else {
        res.write(data)
        res.end()
      }
    })
  }
  else if (pathname.indexOf("static")) {
    try {
      fs.readFile(path.join(__dirname, "/static/", pathname), "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          res.statusCode = 404
        } else {
          res.write(data)
          res.end()
        }
      })
    } catch (error) {
      
    }
  }

})

server.listen(port)
console.log("服务运行在 http://localhost:" + port);

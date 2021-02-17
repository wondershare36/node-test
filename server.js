const http=require("http")
const fs=require("fs")
const url=require("url")
const port =process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server=http.createServer((req,res)=>{
  var parseURL=url.parse(req.url,true)
  var pathWithQuery=req.url
  var queryString=""
  if(pathWithQuery.indexOf("?")>=0){
    queryString=pathWithQuery.substring(pathWithQuery.indexOf("?"))
  }
  var path=parseURL.pathname
  var query=parseURL.query
  var method=req.method
  /******** 从这里开始看，上面不要看 ************/

  console.log('有个傻子发请求过来啦！路径（带查询参数）为：' + pathWithQuery)

  if(path === '/'){
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.write(`二哈`)
    res.end()
  } else if(path === '/x'){
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/css;charset=utf-8')
    res.write(`body{color: red;}`)
    res.end()
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html;charset=utf-8')
    res.write(`你输入的路径不存在对应的内容`)
    res.end()
  }

  /******** 代码结束，下面不要看 ************/
})


server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
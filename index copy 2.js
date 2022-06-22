// http模块
const http = require("http")
const url = require("url")
// req  IncomingMessage对象
// res  ServerResponse对象

function handleReq(req) {
    const urlObj = url.parse(req.url)
    // console.log("请求路径", urlObj);
    // console.log(`请求方法`, req.method)
    // console.log("请求头", req.headers);

    let body = "";
    req.on("data", chunk => {
        body += chunk.toString("utf-8");
    })
    req.on("end", () => {
        console.log(`请求体`, body)
    })
}


const server = http.createServer((req, res) => {
    // console.log(req)
    handleReq(req);
    res.setHeader("a", "1");
    res.write("HELLO NIHAO!");
    res.statusCode = 200;
    res.end();
})

server.listen(9527);

server.on("listening", () => {
    console.log(`监听9527端口中...`)
})
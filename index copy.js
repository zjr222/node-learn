// http模块
const http = require("http")

const options = {
    hostname: '127.0.0.1',
    port: 9527,
    method: 'GET',
    headers: {
        "content-type": "application/json",
    },
}

const req = http.request('www.baiu.com', result => {
    console.log('result',result)
})

console.log(req)

req.on("data", chunk => {
    console.log(chunk.toString("utf-8"))
})
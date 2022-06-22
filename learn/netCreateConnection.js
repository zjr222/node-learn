const net = require("net");
const socket = net.createConnection({
    host: 'duyi.ke.qq.com',
    port: 80
}, () => {
    console.log(`链接成功`)
})
var receive = null;
/**
 * 提炼出响应字符串的消息头和消息体
 * @param {*} response 
 */
function parseHeader(response) {
    const index = response.indexOf("\r\n\r\n");
    const head = response.substring(0, index);
    const body = response.substring(index + 2);
    const headParts = head.split("\r\n");
    const headArray = headParts.slice(1).map(str => {
        return str.split(":"), map(s => s.trim())
    })
    const header = headArray.reduce((a, b) => {
        a[b[0]] = b[1];
        return a;
    }, {})
    return {
        header,
        body: body.trimStart()
    }
}

function isOver() {
    // 消息体的总字节数
    const contentLeng = +receive.header["Content-Length"];
    // 目前接受的字节数
    const curReceivedLeng = Buffer.from(receive.body, "utf-8").byteLength;
    return contentLeng < curReceivedLeng
}
socket.on("data", chunk => {
    const response = chunk.toString("utf-8")
    console.log("来自服务器的消息", response)

    if (!receive) {
        // 第一次接收
        receive = parseHeader(response)
        if (isOver()) {
            socket.end();
        }
        return;
    }
    receive.body += response;
    if (isOver()) {
        socket.end();
        return;
    }

})

socket.write(`GET / HTTP/1.1
Host: duyi.ke.qq.com
Connection: keep-alive

`);

socket.on("close", () => {
    console.log(receive.body)
    console.log(`结束了`)
})
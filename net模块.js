const net = require("net");
const server = net.createServer()

server.listen(5500) //服务器监听9527端口

server.on("listening", () => {
    console.log(`监听sever listen 5500 ...`)
})

server.on("connection", socket => {
    console.log(`有客户端连接到服务器`)

    socket.on("data", chunk => {
        console.log(chunk.toString("utf-8"))
        socket.write(`HTTP/1.1 200 OK
Content-Type: text/plain
                
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>牛逼</div>
</body>
</html>`);
        socket.end(); //关闭连接
    });
    socket.on("end", () => {
        console.log(`连接关闭了`)
    })
})
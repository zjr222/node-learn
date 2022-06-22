const fs = require("fs");
const path = require("path")

function method() {
    const from = path.resolve(__dirname, '1.txt');
    const to = path.resolve(__dirname, '2.txt');
    console.time("读取")
    const rs = fs.createReadStream(from, {
        encoding: "utf-8",
        autoClose: true,
        highWaterMark: 2
    });
    const ws = fs.createWriteStream(to);
    rs.on("data", chunk => {
        const flag = ws.write(chunk);
        if (!flag) {
            // 表示读取的速度大于写入的速度，造成背压
            rs.pause() //暂停读取
        }
    })

    ws.on("drain", () => {
        // 表示写入队列清空了 管道又可以写入数据了
        console.log(`读取恢复`)
        rs.resume(); // 读取恢复
    })
    rs.on("close", () => {// 读取结束了
        ws.end(); //写入完成
        console.timeEnd("读取");
        console.log(`复制完成`)
    })
}
method()
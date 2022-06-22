const http = require("http")

const requset = http.request("http://duyi.ke.qq.com/", {
    method: "GET",
}, resp => {
    console.log(`resp`,resp)
    // console.log("服务器响应的状态码", resp.statusCode);
    // console.log("服务器的响应头", resp.headers["content-type"]);
    // 流
    let result = ""
    resp.on("data", chunk => {
        const data = chunk.toString("utf-8");
        result += data;
    })

    resp.on("end", ()=>{
        // console.log(result)
    })
})

// 可写流 requset
requset.write("牛逼") 
requset.end(); // 消息体结束


// 搭建服务器
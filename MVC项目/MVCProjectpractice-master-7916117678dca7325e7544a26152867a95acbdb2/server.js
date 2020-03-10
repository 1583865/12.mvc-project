// 为了搭建服务器 要使用http模块
var http = require("http");
// 为了读取文件 要使用fs模块
var fs = require("fs");
// 为了解决路径问题 使用URL模块
var url = require("url");
// 定义MimeType对象
var MT = {
	css: "text/css",
	html: "text/html",
	js: "application/x-javascript",
	jpg: "image/jpeg",
	png: "image/png",
	gif: "image/gif"
}
// 创建服务器
var server = http.createServer(function(req, res) {

	var obj = url.parse(req.url);
	// 确定后缀名称
	// 通过split方法将obj.pathname分割成数组 得到数组的最后意向就得到了后缀名称
	var extName = obj.pathname.split(".").pop();
	// 根据后缀名称生成一个mimetype字符串 
	var pathname = obj.pathname;
	fs.readFile("." + pathname, function(err, data) {
		if (err) {
			res.setHeader("content-type", "text/plain;charset=utf-8");
			res.end("抱歉，您读取的文件" + req.url + "不存在");
			return;
		}
		// 最后 拼接到这里
		res.setHeader("content-type", MT[extName] + ";charset=utf-8");
		res.end(data);
	});
});

// 监听端口号
server.listen(3000);
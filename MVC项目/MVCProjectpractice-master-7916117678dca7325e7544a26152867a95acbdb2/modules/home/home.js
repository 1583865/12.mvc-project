define(function(require, exports, module) {
	var Observer = require("modules/tools/tools").Observer;
	// 发送ajax请求数据
	MVC.addCtrl("home", function(M, V){
		$.ajax ({
			url: "/data/home.json",
			type: "get",
			dataType: "json",
			success: function(data) {
				M.add("home", data.data);
				Observer.trigger("msg");
			}
		});
	});
});
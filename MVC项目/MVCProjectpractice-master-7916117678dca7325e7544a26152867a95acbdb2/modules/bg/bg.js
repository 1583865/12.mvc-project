define(function(require, exports, module) {
	//引入工具模块
	var tools = require("modules/tools/tools");
	var format = tools.format;


	// 添加数据
	MVC.addModel("bg", {
		idx: parseInt(Math.random() * 6),
		arr: ["/images/art/bg1.jpg","/images/art/bg2.jpg","/images/art/bg3.jpg","/images/art/bg4.jpg","/images/art/bg5.jpg","/images/art/bg6.jpg"]
	})
	// 创建视图函数
	MVC.addView("bg", function(M) {
		// 一获取容器
		var $dom = $("#bg");
		// 二获取数据  m层
		var data = M.get("bg");
		// 三定义面板
		var tpl = "<ul><%li%></ul>";
		var li_tpl = '<li><img src="<%src%>" alt=""></li>';

		// 四定义变量
		var html = '';
		var li_html ='';
		// 五 格式化
		for (var i = 0; i < data.arr.length; i++) {
			li_html += format(li_tpl, {
				src: data.arr[i]
			})
		}
		html = format(tpl, {
			li: li_html
		})
		// 填充容器
		$dom.html(html);
		// 七 返回容器
		return $dom;


	});
	// 添加控制器
	MVC.addCtrl("bg", function(M,V) {
		// 调用视图
		var $dom = V.create("bg");
		// 轮播图交互
		var idx =M.get("bg").idx;
		$dom.find("li").eq(idx).show().siblings().hide();
		// 自动轮播
		setInterval(function() {
			idx++;
			if (idx > $dom.find("li").length -1) {
				idx = 0;
			}
			$dom.find("li").eq(idx).fadeIn(1500).siblings().fadeOut(1500);

		}, 3000)
	});
})
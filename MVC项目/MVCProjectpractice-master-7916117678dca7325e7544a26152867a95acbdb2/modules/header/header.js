define(function(require, exports, module) {
	//引入工具函数
	var tools = require("modules/tools/tools");
	var format = tools.format;

	// 添加视图
	MVC.addView("header", function(M) {
		// 获取容器
		var $dom = $("#header");
		//获取数据
		var data =M.get("header");
		//定义模板
		var tpl = [
		'<div class="container">',
		'<div class="top">',
		'<div class="logo"><img src="<%logo%>" alt=""></div>',
		'<ul><%icon_li_tpl%></ul>',
		'</div>',
		'<ul class="nav"><%nav_li_tpl%></ul>',
		'</div>'

		].join("");
		// 定义小模板1
		var icon_li_tpl = '<li><img src="<%src%>" alt=""></li>';

		// 定义小模板2
		var nav_li_tpl1 = '<li><a href="<%href%>"><%title%></a></li>';
		var nav_li_tpl2 = '<li><a href="<%href%>"><%title%></a><ul><%dropdown_li_tpl%></ul></li>';
		var dropdown_li_tpl = '<li><a href="<%href%>"><%title%></a></li>';


		// 定义变量
		var html = "";
		var icon_li_html = "";
		var nav_li_html = "";

		// 格式化
		// 格式化小模板1
		data.icon.forEach(function(value, index) {
			icon_li_html += format(icon_li_tpl, {
				src: value.img
			});
		});

		//格式化小模板2
		data.nav.forEach(function(value, index) {
			if (value.list) {
				// 定义临时变量用于装在下拉菜单
				var dropdown_li_html = "";
				//格式化下拉菜单
				value.list.forEach(function(value){
					dropdown_li_html += format(dropdown_li_tpl, value);

				});
				nav_li_html += format(nav_li_tpl2, {
					href: value.href,
					title: value.title,
					dropdown_li_tpl: dropdown_li_html
				})
			}else {
				nav_li_html += format(nav_li_tpl1, {
					href: value.href,
					title: value.title
				})
			}
		})

		// 格式化大模板
		html = format(tpl, {
			logo: data.logo,
			icon_li_tpl: icon_li_html,
			nav_li_tpl: nav_li_html
		})
		// 填充容器
		$dom.html(html);
		// 返回容器
		return $dom;
	});


// 添加控制函数

MVC.addCtrl("header", function(M, V) {
	$.ajax({
		url:"/data/header.json",
		data: "",
		type: "get",
		dataType:"json",
		success: function(data) {
			// 数据请求回来， 加入模心层
			M.add("header", data);
			// 数据已存入模型层  通知V层创建视图
			var $dom = V.create("header");
			// 添加交互
			var $lis  =$dom.find(".nav").children();

			// 鼠标移入
			$lis.on("mouseenter", function() {
				$(this).find("ul").slideDown(400);
			});
			// 鼠标离开关闭
			$lis.on("mouseleave", function() {
				$(this).find("ul").slideUp(200);
			});

		}
	});
});
});
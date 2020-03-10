define(function(require, expores,module) {
	var tools = require("modules/tools/tools");
	var format = tools.format;
	var Observer = tools.Observer;
	MVC.addView("carousel", function(M) {
		// 获取容器
		var $dom = $("#carousel");
		// 获取数据
		var data = M.get("home.carousel");
		console.log(data);
		// 定义模板
		var tpl = [
		'<div class="container">',
		'<ul class="carousel"><%li_tpl%></ul>',
		'<ul class="cirs"><li id="leftBtn"></li><%cir_tpl%><li id="rightBtn"></li> </ul>',
		'<p class="title"><%title%></p>',
		'</div>'

		].join("");
		var li_tpl= '<li><img src="<%img%>" alt="" ><p><%intro%></p></li>';


		// 第四步 定义变量
		var html = "";
		var li_html = "";
		var cir_html = "";
		// 第五步 格式化
		data.list.forEach(function(value) {
			li_html += format(li_tpl, {
				img: value.src,
				intro: value.intro
			});
			cir_html += "<li></li>";
		});
		html = format(tpl, {
			li_tpl: li_html,
			cir_tpl: cir_html,
			title: data.title
		});
		// 第六步 填充容器
		$dom.html(html);
		// 第七步 返回容器
		return $dom;

	})

	MVC.addCtrl("carousel", function(M, V) {
		Observer.on("msg", function() {
			var $dom = V.create("carousel");
			var $lis = $dom.find(".cirs li");
			var $img_lis = $dom.find(".carousel li");
			var arr = [].slice.call($lis);
			// 第一项取出
			var first = arr.shift();
			// 最后一项取出
			var last = arr.pop();
			// 第一个小圆点样式
			$(arr[0]).addClass("active");
			// 第一张图片显示
			$img_lis.eq(0).siblings().fadeOut()
			arr.forEach(function(value, index) {
				// 循环事件
				value.onclick = function() {
					idx = index;
					$(this).addClass("active").siblings().removeClass("active");
					$img_lis.eq(index).fadeIn(500).siblings().fadeOut(500);

				}
			});
			// 定义信号量
			var idx = 0;
			// 左按钮事件
			// 左按钮点击事件
			first.onclick = function() {
				idx--;
				if (idx < 0) {
					idx = arr.length - 1;
				}
				$(arr[idx]).addClass("active").siblings().removeClass("active");
				$img_lis.eq(idx).fadeIn(500).siblings().fadeOut(500)
			}
			// 左按钮事件
			last.onclick = function() {
				idx++;
				if (idx > arr.length - 1) {
					idx = 0;

				}
				$(arr[idx]).addClass("active").siblings().removeClass("active");
				$img_lis.eq(idx).fadeIn(500).siblings().fadeOut(500);
				
			}




			
		});
	});
});
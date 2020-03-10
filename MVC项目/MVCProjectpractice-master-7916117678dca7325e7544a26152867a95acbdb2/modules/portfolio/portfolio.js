define(function(require, exports, module) {
	// 引入工具模块
	var tools = require("modules/tools/tools");
	// 获取格式化函数
	var format = tools.format;
	var getMinIdx = tools.getMinIdx;
	// 添加视图
	MVC.addView("portfolio", function(M) {
		var $dom = $("#portfolio");
		var data = M.get("portfolio");
		var tpl = [
		'<div class="container">',
		'<div class="title">',
		'<h2><%title%></h2>',
		'<p class="content"><%content%></p>',
		'</div>',
		'<div class="filter">',
		'<div class="left">FILTER:</div>',
		'<ul><%li_tpl%></ul>',
		'</div>',
		'<ul id="waterfall"></ul>',
		'</div>'



		].join("");
		var li_tpl = '<li><a><%name%></a></li>';

		// 定义变量
		var html ="";
		var li_html ='';
		// 格式化
		for (var i in data.filter) {
			li_html += format(li_tpl, {
				name: i.toUpperCase()
			});
		}
		html = format(tpl, {
			title: data.title,
			content: data.content,
			li_tpl: li_html
		})

		// 填充容器
		$dom.html(html);
		return $dom;
	})
	MVC.addCtrl("portfolio", function(M, V) {
		$.ajax({
			url:"/data/portfolio.json",
			dataType: "json",
			success: function(data) {
				M.add("portfolio", data);
				var $dom = V.create("portfolio");
				// 获取瀑布流容器
				var $waterfall = $dom.find("#waterfall");
				// 渲染结构
				var data = M.get("portfolio.filter");
				// 高度映射数组
				var height_arr = new Array(5).fill(20);
				var all_arr = [];
				var categoryI_arr = [];
				var categoryII_arr = [];
				var video_arr = [];
				// 根据data.all数组渲染结构
				data.All.forEach(function(value) {
					// 创建容器li
					var li = document.createElement("li");
					// 生成图片
					var img = new Image();
					// 设置src
					img.src = "/images/art/" + value + ".jpg";
					// 监听onload事件
					img.onload = function() {
						all_arr.push(li);
						if (data.CategoryI.indexOf(value) != -1) {
							categoryI_arr.push(li);
						}

						if (data.CategoryII.indexOf(value) != -1) {
							categoryII_arr.push(li);
						}

						if (data.Video.indexOf(value) != -1) {
							video_arr.push(li);
						}








						// 获取宽度高度
						var width = img.width;
						var height = img.height;
						// 最小项下标
						var minIdx = getMinIdx(height_arr);
						// 上树
						li.appendChild(img);
						li.style.position  ="absolute";
						li.style.left = minIdx * 184 + "px";
						li.style.top = height_arr[minIdx] + "px";
						//上树
						$waterfall.append(li);
						// 改变数组最小值
						height_arr[minIdx] += this.height + 20;
						// 计算最大值
						$waterfall.css({
							height: Math.max.apply("", height_arr)});


					}


				});


	// 获取四个标签
	var $lis = $dom.find(".filter ul li");
	var $all = $lis.eq(0);
	var $categoryI = $lis.eq(1);
	var $categoryII = $lis.eq(2);
	var $video = $lis.eq(3);

	// 点击事件
	$all.click(function() {
		sort(all_arr, all_arr)
	});
	$categoryI.click(function(){
		sort(all_arr,categoryI_arr)
	});
	$categoryII.click(function() {
		sort(all_arr, categoryII_arr)
	});
	$video.click(function() {
		sort(all_arr, video_arr)
	});


	function sort(all, cate) {
		// 高度映射数组清空
		height_arr.fill(20);
		// 将不属于分类的过滤出来
		var other_arr = all.filter(function(value) {
			return cate.indexOf(value) === -1;
		});
		cate.forEach(function(value) {
			// 获取最小项
			var minIdx = getMinIdx(height_arr);
			$(value).animate({
				left: minIdx * 184,
				top: height_arr[minIdx],
				opacity: 1
			}, 1000);
			height_arr[minIdx] += $(value).height() + 20;

		});
		// 不属于的隐藏
		other_arr.forEach(function(value) {
			$(value).animate({
				opacity: 0
			}, 1000);
		});

	}





			}
		});
	});
});
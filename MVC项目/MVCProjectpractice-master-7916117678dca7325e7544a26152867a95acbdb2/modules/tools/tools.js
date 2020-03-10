define(function(require, exports, module) {
	// 向外提供一系列的工具函数
	// 格式化函数
	function format(tpl, dic) {
		// 返回一个被格式化之后的字符串
		return tpl.replace(/<%(\w+(\.\w+)*)%>/g, function(match, $1) {
			// 将$1以.分割
			var pathArr = $1.split(".");
			// 定义变量 引用dic 防止dic的地址发生变化
			var result = dic;
			// 开始循环每一层级 除了最后一层之外
			for (var i = 0; i < pathArr.length - 1; i++) {
				result = result[pathArr[i]];
			}
			return result[pathArr[i]];
		})
	}
	// 提供观察者
	var Observer = (function() {
		var obj = {

		}

		return {
			on: function(eventName, handler) {
				if (obj[eventName] instanceof Array) {
					// 说明已经用过了 直接往里面push
					obj[eventName].push(handler);
				} else {
					obj[eventName] = [handler];
				}
			},
			trigger: function(eventName, value) {
				if (obj[eventName]) {
					for (var i = 0; i < obj[eventName].length; i++) {
						obj[eventName][i](value);
					}
				}
			},
		}
	})();

	// 最小下标方法，定义getminidx属性
	var getMinIdx = function(arr) {
		var idx = 0;
		var min = arr[idx];
		// 循环
		for (var i = 1; i < arr.length; i++){
			if (min > arr[i]){
				min = arr[i];
				idx = i;
			}
		}
		return idx;
	}

	module.exports.format = format;
	module.exports.Observer = Observer;
	module.exports.getMinIdx = getMinIdx;
})
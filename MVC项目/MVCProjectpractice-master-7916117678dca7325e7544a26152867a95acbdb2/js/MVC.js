


var MVC = (function() {






	//m层
	var M = (function(){

		// m存储数据
		var _M = {


		};
		return {
			add: function(path, value) {
				// path以点分割
				var pathArr = path.split(".");
				var result = _M;

				// 循环pathArr
				for (var i = 0; i  < pathArr.length - 1; i++) {
					var temp  =result[pathArr[i]];
					//判断层级是否是一个对象
					if (typeof temp === "object" && temp != null || typeof temp === "function") {

					}else if(typeof temp === "undefined") {
						result[pathArr[i]] = {};

					}else {
						throw new Error("以占数据");

					}
					//之下一层级
					result = result[pathArr[i]];

				}
				// 循环完毕之后进入倒数第二层
				// 判定没使用过
				if (typeof result[pathArr[i]] === "undefined"){
					result[pathArr[i]] = value;
				}else {
					throw new Error("已被占用数据");
				}
			},



			get: function(path) {
				//分割数组
				var pathArr = path.split(".");
				//备份_m
				var result = _M;
				// 开始循环
				for (var i= 0; i < pathArr.length - 1; i++) {
					// 定义临时变量
					var temp = result[pathArr[i]];
					if (typeof temp === "object" && temp != null || typeof temp === "function") {
						//之下一层
						result = result[pathArr[i]];

					}else {
						return null;
					}
				}
				return result[pathArr[i]];
			}

		}
	})();





	// 定义v层
	var V = (function() {
		var _V = {};
		return {
			add: function(name, handler) {
				_V[name] = handler;
			},

			create: function(name) {
				return _V[name] && _V [name](M);
			}
		}
	})();







	// 定义c层
	var C = (function() {
		var _C = {};
		return {
			add: function(name,handler) {
				_C[name] = handler;
			},
			init: function() {
				for (var i in _C) {
					_C[i](M, V);
				}
			}
		}
	})();



// 返回
	return {
		addModel: function(path, value) {
			M.add(path, value);
		},
		addView: function(name, handler) {
			V.add(name, handler);
		},
		addCtrl:function(name, handler) {
			C.add(name, handler);
		},
		install: function() {
			C.init();
		}
	}
})();
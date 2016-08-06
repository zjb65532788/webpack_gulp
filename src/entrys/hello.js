/*require('vue');
*/
var a = [];
for (var i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 10

//es6所以需要 babel加载器去解析 let仅在块级作用域内有效
var a = [];
for (let i = 0; i < 10; i++) {
  a[i] = function () {
    console.log(i);
  };
}
a[6](); // 6

document.onclick=function(){
	require.ensure(['../js/require1.js'], function(require) {
		var a = require("../js/require1.js");
		console.log(a);
	});
}

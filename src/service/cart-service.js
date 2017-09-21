/*
* @Author: imooc
* @Date:   2017-09-20 09:15:38
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-20 09:20:08
*/
'use strict';
var _mm = require('util/mm.js');
var _cart = {
	//获取购物车数量
	getCartCount: function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/get_cart_product_count.do'),
			success : resolve,
			error : reject
		});
	},

};
module.exports = _cart;
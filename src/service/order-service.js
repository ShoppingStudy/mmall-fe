/*
* @Author: imooc
* @Date:   2017-09-27 09:08:53
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-29 11:34:18
*/
'use strict';
var _mm = require('util/mm.js');
var _order = {

	//商品列表
	getProductList: function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/order/get_order_cart_product.do'),
			success : resolve,
			error : reject
		});
	},
	//提交订单
	createOrder: function(orderInfo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/order/create.do'),
			data    : orderInfo,
			success : resolve,
			error   : reject
		});
	},
	//获取商品列表信息
	getOrderList : function(listParam,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/order/list.do'),
			data    : listParam,
			success : resolve,
			error   : reject
		});
	},
	//获取订单详情
	getOrderDetail : function(orderNo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/order/detail.do'),
			data    : {orderNo : orderNo},
			success : resolve,
			error   : reject
		});
	},
	//取消订单
	cancelOrder : function(orderNo,resolve,reject){
		_mm.request({
			url     : _mm.getServerUrl('/order/cancel.do'),
			data    : {orderNo : orderNo},
			success : resolve,
			error   : reject
		});
	},
};
module.exports = _order;
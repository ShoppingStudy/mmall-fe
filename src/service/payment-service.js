/*
* @Author: imooc
* @Date:   2017-09-29 12:35:04
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-29 12:54:18
*/

'use strict';
var _mm = require('util/mm.js');
var _payment = {

	//商品列表
	getPaymentInfo : function(orderNo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/order/pay.do'),
			data : {orderNo : orderNo},
			success : resolve,
			error : reject
		});
	},
	getPaymentStatus : function(orderNo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/order/query_order_pay_status.do'),
			data : {orderNo : orderNo},
			success : resolve,
			error : reject
		});
	},
};
module.exports = _payment;
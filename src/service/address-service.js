/*
* @Author: imooc
* @Date:   2017-09-27 10:12:42
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-28 17:43:04
*/
'use strict';
var _mm = require('util/mm.js');
var _address = {

	//地址列表
	getAddressList: function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/shipping/list.do'),
			data : {
				pageSize : 50
			},
			success : resolve,
			error : reject
		});
	},
	//获取单条地址
	getAddress :  function(shippingId,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/shipping/select.do'),
			data : {
				shippingId : shippingId
			},
			success : resolve,
			error : reject
		});
	},
	//新建地址
	save : function(addressInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/shipping/add.do'),
			data : addressInfo,
			success : resolve,
			error : reject
		});
	},

	//更新地址
	update : function(addressInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/shipping//update.do'),
			data : addressInfo,
			success : resolve,
			error : reject
		});
	},
	//删除地址
	deleteAddress : function(id,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/shipping//del.do'),
			data : {shippingId : id},
			success : resolve,
			error : reject
		});
	},
};
module.exports = _address;
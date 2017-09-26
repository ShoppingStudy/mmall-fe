/*
* @Author: imooc
* @Date:   2017-09-20 09:15:38
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-26 17:16:05
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
	//添加到购物车
	addToCart : function(productInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/add.do'),
			data : productInfo,
			success : resolve,
			error : reject
		});
	},
	// 获取购物车列表
	getCartList: function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/list.do'),
			success : resolve,
			error : reject
		});
	},
	//选择购物车商品
	selectProduct : function(productId,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/select.do'),
			data : {productId : productId},
			success : resolve,
			error : reject
		});
	},
	//取消选择购物车商品
	unselectProduct : function(productId,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/un_select.do'),
			data : {productId : productId},
			success : resolve,
			error : reject
		});
	},
	//全选购物车商品
	selectAllProduct : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/select_all.do'),
			success : resolve,
			error : reject
		});
	},
	//取消全选购物车商品
	unselectAllProduct : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/un_select_all.do'),
			success : resolve,
			error : reject
		});
	},
	//更新购物车商品数量
	updateProduct : function(productInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/update.do'),
			data : productInfo,
			success : resolve,
			error : reject
		});
	},
	//删除指定商品，支持批量，productId 用逗号分隔
	deleteProduct :  function(productIds,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/cart/delete.do'),
			data : {
				productIds : productIds
			},
			success : resolve,
			error : reject
		});
	},

};
module.exports = _cart;
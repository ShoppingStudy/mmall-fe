/*
* @Author: imooc
* @Date:   2017-09-29 10:14:55
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-29 11:36:58
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	data : {
		orderNo : _mm.getUrlParam('orderNumber')
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'order-list'
		});
		this.loadOrderDetail();
	},
	bindEvent : function(){
		var _this = this;
		//取消订单
		$(document).on('click','.order-cancel',function(){
			if(window.confirm('确认取消该订单？')){
				_order.cancelOrder(_this.data.orderNo,function(res){
					_mm.successTips('该订单取消成功！');
					_this.loadOrderDetail();
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
		});
	},
	//加載订单列表
	loadOrderDetail : function(){
		var _this         = this,
			orderDetailHtml = '',
			$content      = $('.content');
		$content.html('<div class="loading"></div>');
		_order.getOrderDetail(_this.data.orderNo,function(res){
			_this.dataFilter(res);
			//渲染html
			orderDetailHtml = _mm.renderHtml(templateIndex,res);
			$content.html(orderDetailHtml);
		},function(errMsg){
			$content.html('<p class="err-tip">'+errMsg+'</p>')
		});
	},
	//数据的适配
	dataFilter : function(data){
		data.needPay      = data.status == 10;
		data.isCancelabel = data.status == 10;
	}
};
$(function(){
	page.init();
});
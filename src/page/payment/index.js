/*
* @Author: imooc
* @Date:   2017-09-29 12:14:57
* @Last Modified by:   imooc
* @Last Modified time: 2017-10-05 10:12:31
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm           = require('util/mm.js');
var _payment      = require('service/payment-service.js');
var templateIndex = require('./index.string');

var page = {
	data : {
		orderNo : _mm.getUrlParam('orderNumber')
	},
	init : function(){
		this.onLoad();
	},
	onLoad : function(){
		this.loadPaymentInfo();
	},
	//加载支付信息
	loadPaymentInfo : function(){
		var _this         = this,
			paymentHtml = '',
			$pageWrap      = $('.page-wrap');
		$pageWrap.html('<div class="loading"></div>');
		_payment.getPaymentInfo(_this.data.orderNo,function(res){
			console.log(res);
			//渲染html
			paymentHtml = _mm.renderHtml(templateIndex,res);
			$pageWrap.html(paymentHtml);
			_this.listenOrderStatus();
		},function(errMsg){
			$pageWrap.html('<p class="err-tip">'+errMsg+'</p>');
		});
	},
	//监听订单状态
	listenOrderStatus : function(){
		var _this = this;
		_this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNo,function(res){
				if(res == true){
					window.location.href = './result.html?type=payment&orderNumber=' 
											+ _this.data.orderNo;
				}
			},function(errMsg){
				$pageWrap.html('<p class="err-tip">'+errMsg+'</p>');
			});
		},5e3);
	}
};
$(function(){
	page.init();
});
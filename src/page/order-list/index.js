/*
* @Author: imooc
* @Date:   2017-09-29 08:51:52
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-29 10:12:22
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var Pagination    = require('util/pagination/index.js');
var _mm = require('util/mm.js');
var _order = require('service/order-service.js');
var templateIndex = require('./index.string');

var page = {
	data : {
		listParam : {
			pageNum :1,
			pageSize : 2
		}
	},
	init : function(){
		this.onLoad();
		this.loadOrderList();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'order-list'
		});
	},
	//加載订单列表
	loadOrderList : function(){
		var _this         = this,
			orderListHtml = '',
			$listCon      = $('.order-list-con');
		$listCon.html('<div class="loading"></div>');
		_order.getOrderList(_this.data.listParam,function(res){
			// _this.dataFilter(res);
			//渲染html
			orderListHtml = _mm.renderHtml(templateIndex,res);
			$listCon.html(orderListHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage         : res.prePage,
				hasNextPage     : res.hasNextPage,
				nextPage        : res.nextPage,
				pageNum         : res.pageNum,
				pages           : res.pages
			});
		},function(errMsg){
			$listCon.html('<p class="err-tip">加载订单列表失败！请重试</p>')
		});
	},
	//数据的过滤
	dataFilter : function(data){
		data.isEmpty = !data.list.length;
	},
	// 加载分页信息
	loadPagination : function(pageInfo){
		var _this = this;
		this.pagination ? '' :this.pagination = new Pagination();
		this.pagination.render($.extend({},pageInfo,{
			container : $('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadOrderList();
			}
		}));
	}
};
$(function(){
	page.init();
});
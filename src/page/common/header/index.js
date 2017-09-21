/*
* @Author: imooc
* @Date:   2017-09-20 09:43:43
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-20 15:54:28
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');

//通用页面头部
var header = {
	init : function(){
		this.bindEvent();
	},
	onLoad : function(){
		var keyword = _mm.getUrlParam('keyword');
		//keyword存在，则回填输入框
		if(keyword){
			$('#search-input').val(keyword);
		};
	},
	bindEvent : function(){
		var _this = this;
		//点击搜索按钮之后
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车后，会做搜索提交
		$('#search-input').keyup(function(e){
			//敲下回车
			if(e.keyCode === 13){
				_this.searchSubmit();
			}
		});
	},
	//搜索的提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		// 如果提交的的时候有keyword,正常跳转到list页
		if(keyword){
			window.location.href = './list.html?keyword='+ keyword;
		}
		// 如果keyword为空，直接返回首页
		else{
			_mm.goHome();
		}
	}
};
header.init();
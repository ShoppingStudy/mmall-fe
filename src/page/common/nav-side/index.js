/*
* @Author: imooc
* @Date:   2017-09-20 16:24:03
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-20 17:00:36
*/
'use strict';
require('./index.css');
var _mm = require('util/mm.js');
var templateIndex = require('./index.string');

//侧边导航
var navSide = {
	option : {
		name : '',
		navList : [
			{name : 'user-center', desc : '个人中心' , href: './user-center.html'},
			{name : 'order-list', desc : '我的订单' , href: './order-list.html'},
			{name : 'pass-update', desc : '修改密码' , href: './pass-update.html'},
			{name : 'about', desc : '关于MMall' , href: './about.html'}
		]
	},
	init : function(option){
		//合并选项
		$.extend(this.option,option);
		this.renderNav();
	},
	//渲染导航菜单
	renderNav : function(){
		// 计算active数据
		for(var i = 0,iLength = this.option.navList.length; i < iLength;i++){
			if(this.option.navList[i].name === this.option.name){
				this.option.navList[i].isActive = true;
			}
		};
		//渲染lsit数据
		var navHtml = _mm.renderHtml(templateIndex,{
			navList : this.option.navList
		});
		//把html放入容器
		$('.nav-side').html(navHtml);
	}
};

module.exports = navSide;
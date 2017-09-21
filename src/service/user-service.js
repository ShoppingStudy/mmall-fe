/*
* @Author: imooc
* @Date:   2017-09-20 08:56:50
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-20 09:10:34
*/
'use strict';
var _mm = require('util/mm.js');
var _user = {
	//检查登录状态
	checkLogin: function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	},

	//退出登录
	logout : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/logout.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	}
};
module.exports = _user;
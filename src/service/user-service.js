/*
* @Author: imooc
* @Date:   2017-09-20 08:56:50
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-23 16:16:49
*/
'use strict';
var _mm = require('util/mm.js');
var _user = {

	//用户登录
	login: function(userInfo ,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/login.do'),
			method : 'POST',
			data : userInfo,
			success : resolve,
			error : reject
		});
	},
	//用户注册
	register: function(userInfo ,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/register.do'),
			method : 'POST',
			data : userInfo,
			success : resolve,
			error : reject
		});
	},
	//检查登录状态
	checkLogin: function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/get_user_info.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	},
	//检查用户名是否存在
	checkUsername: function(username ,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/check_valid.do'),
			data :{
				type : 'username',
				str : username
			},
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
	} ,
	//获取密码提示问题
	getQuestion : function(username,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/for_get_question.do'),
			method : 'POST',
			data : {
				username : username
			},
			success : resolve,
			error : reject
		});
	},
	//提交密码提示问题的答案
	checkAnswer : function(userInfo ,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/for_check_answer.do'),
			method : 'POST',
			data : userInfo,
			success : resolve,
			error : reject
		});
	},
	//忘记密码时的重置密码
	resetPassword : function(userInfo ,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/for_reset_password.do'),
			method : 'POST',
			data : userInfo,
			success : resolve,
			error : reject
		});
	},
	//获取用户信息
	getUserInfo : function(resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/get_information.do'),
			method : 'POST',
			success : resolve,
			error : reject
		});
	} ,
	//更改用户信息
	updateUserInfo : function(userInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/update_infomation.do'),
			method : 'POST',
			data : userInfo,
			success : resolve,
			error : reject
		});
	} ,
	//更改用户密码
	updatePassword : function(userInfo,resolve,reject){
		_mm.request({
			url : _mm.getServerUrl('/user/reset_password.do'),
			method : 'POST',
			data : userInfo,
			success : resolve,
			error : reject
		});
	} ,
};
module.exports = _user;
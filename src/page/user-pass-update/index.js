/*
* @Author: imooc
* @Date:   2017-09-22 10:32:29
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-23 16:25:06
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm     = require('util/mm.js');
var _user   = require('service/user-service.js');


var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'user-pass-update'
		})
	},
	bindEvent : function(){
		var _this = this;
		//点击提交
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				passwordOld : $.trim($('#password').val()),
				passwordNew : $.trim($('#password-new').val()),
				passwordConfirm : $.trim($('#password-confirm').val()),
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				//更改用户密码
				_user.updatePassword({
					passwordOld : userInfo.passwordOld,
					passwordNew : userInfo.passwordNew
				},function(res){
					_mm.successTips(res.msg);
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	//验证表单信息
	validateForm : function(formData){
		var result = {
			status : false,
			msg : ''
		};
		//验证原密码是否为空
		if(!_mm.validate(formData.passwordOld,'require')){
			result.msg = '原密码不能为空';
			return result;
		}
		//验证新密码是否为空
		if(!formData.passwordNew || formData.passwordNew.length < 6){
			result.msg = '新密码长度不能小于6位';
			return result;
		}
		//验证2次密码是否一致
		if(formData.passwordNew !== formData.passwordConfirm){
			result.msg = '2次密码输入不一致';
			return result;
		}
		//通过验证，返回正确提示
		result.status = true;
		result.msg = '密码通过';
		return result;
	} 
};
$(function(){
	page.init();
});
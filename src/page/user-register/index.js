/*
* @Author: imooc
* @Date:   2017-09-21 16:00:41
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-21 17:48:30
*/


'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(errMsg){
		$('.error-item').hide().find('.err-msg').text('');
	}
};
//page 逻辑部分
var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent : function(){
		var _this = this;
		//验证username
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			//如果用户名为空，则不做验证
			if(!username){
				return;
			}
			//异步验证
			_user.checkUsername(username,function(res){
				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			});
		});
		//注册按钮的事件
		$('#submit').click(function(){
			_this.submit();
		});
		//按下回车也提交
		$('.user-content').keyup(function(e){
			if(e.keyCode === 13 ){
				_this.submit();
			}
		});
	},
	//提交表单
	submit : function(){
		var formData = {
			username         : $.trim($('#username').val()),
			password         : $.trim($('#password').val()),
			passwordConfirm : $.trim($('#password-confirm').val()),
			phone            : $.trim($('#phone').val()),
			email            : $.trim($('#email').val()),
			question         : $.trim($('#question').val()),
			answer           : $.trim($('#answer').val())
		},
		validateResult = this.formValidate(formData);
		if(validateResult.status){
			//提交
			_user.register(formData,function(res){
				window.location.href ='./result.html?type=register';
			},function(errMsg){
				formError.show(errMsg);
			});
		}else{
			//错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单验证
	formValidate : function(formData){
		var result = {
			status : false,
			msg : ''
		};
		if(!_mm.validate(formData.username,'require')){
			result.msg = '用户名不能为空';
			return result;
		}
		if(!_mm.validate(formData.password,'require')){
			result.msg = '密码不能为空';
			return result;
		}
		if(formData.password.length < 6){
			result.msg = '密码长度不能少于6位';
			return result;
		}
		//验证2次密码输入是否一致
		if(formData.password !== formData.passwordConfirm){
			result.msg = '2次输入的密码不一致';
			return result;
		}
		//验证手机号
		if(!_mm.validate(formData.phone,'phone')){
			result.msg = '手机号格式不正确';
			return result;
		}
		//验证邮箱
		if(!_mm.validate(formData.email,'email')){
			result.msg = '邮箱格式不正确';
			return result;
		}
		//验证密码提示问题
		if(!_mm.validate(formData.question,'require')){
			result.msg = '密码提示问题格式不正确';
			return result;
		}
		//验证密码提示问题答案
		if(!_mm.validate(formData.answer,'require')){
			result.msg = '密码提示问题答案格式不正确';
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

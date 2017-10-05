/*
* @Author: Administrator
* @Date:   2017-09-18 18:08:07
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-22 10:11:25
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
	data : {
		username : '',
		question : '',
		answer : '',
		token : ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadStepUsername();
	},
	bindEvent : function(){
		var _this = this;
		//输入用户名下一步按钮的点击事件
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			//用户名
			if(username){
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				},function(errMsg){
					formError.show(errMsg);
				})
			}
			else{
				formError.show('请输入用户名');
			}
		});
		//输入密码提示问题答案提示问题下一步按钮的点击事件
		$('#submit-question').click(function(){
			//答案
			var answer = $.trim($('#answer').val());
			if(answer){
				//检查密码提示答案
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer : answer
				},function(res){
					_this.data.answer = answer;
					_this.data.token = res;
					_this.loadStepPassword();
				},function(errMsg){
					formError.show(errMsg);
				})
			}
			else{
				formError.show('请输入密码提示问题的答案');
			}
		});
		//输入新密码按钮的点击事件
		$('#submit-password').click(function(){
			//答案
			var passwordNew = $.trim($('#password').val());
			if(passwordNew && passwordNew.length >= 6){
				//检查密码提示答案
				_user.resetPassword({
					username : _this.data.username,
					passwordNew : passwordNew,
					forgetToken : _this.data.token
				},function(res){
					window.location.href = './result.html?type=pass-reset';
				},function(errMsg){
					formError.show(errMsg);
				})
			}
			else{
				formError.show('请输入不少于6位的新密码');
			}
		});
		
	},
	//加载输入用户名的一步
	loadStepUsername : function(){
		$('.step-username').show();
	},
	//加载输入密码提示问题答案的一步
	loadStepQuestion : function(){
		//清除错误提示
		formError.hide();
		$('.step-username').hide().siblings('.step-question').show()
		.find('.question').text(this.data.question);
	},
	//加载输入password的一步
	loadStepPassword : function(){
		//清除错误提示
		formError.hide();
		// 容器切换
		$('.step-question').hide().siblings('.step-password').show();
	},
};
$(function(){
	page.init();
});

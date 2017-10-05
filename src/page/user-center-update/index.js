/*
* @Author: imooc
* @Date:   2017-09-22 10:32:29
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-22 17:52:03
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm     = require('util/mm.js');
var _user   = require('service/user-service.js');
var templateIndex = require('./index.string');

var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		//初始化左侧菜单
		navSide.init({
			name : 'user-center'
		});
		this.loadUserInfo();
	},
	bindEvent : function(){
		var _this = this;
		//点击提交
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				phone : $.trim($('#phone').val()),
				email : $.trim($('#email').val()),
				question : $.trim($('#question').val()),
				answer : $.trim($('#answer').val())
			},
			validateResult = _this.validateForm(userInfo);
			if(validateResult.status){
				_user.updateUserInfo(userInfo,function(res){
					_mm.successTips(res.msg);
					window.location.href = './user-center.html';
				},function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	//验证表单信息
	validateForm : function(formData){
		var result = {
			status : false,
			msg : ''
		};
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
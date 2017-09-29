/*
* @Author: imooc
* @Date:   2017-09-21 08:49:17
* @Last Modified by:   imooc
* @Last Modified time: 2017-09-29 13:07:41
*/
'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default',
		$element = $('.' + type + '-success');
	if(type === 'payment'){
		var orderNumber = _mm.getUrlParam('orderNumber'),
			$orderNumber = $element.find('.order-number');
		$orderNumber.attr('href',$orderNumber.attr('href') + orderNumber );
	}
	//显示对应的元素提示
	$element.show();	
});
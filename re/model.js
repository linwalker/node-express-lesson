
'use strict';

var request = require('request');
var config = require('../config/config');

class Landlord
{

	getList(params) {
		var url = config.host.apollo_api + '/admin/landlord/list';
		url+='?'+ (params ? JSON.stringify(params) : '{}');
		console.log(url);
		url = encodeURI(url);
		return new Promise(function (resolve, reject) {
			require('request').get({url: url}, function (err, res, data) {
				return resolve(data);
			});
		});
	}
	getAddBack(params) {
		//var url = config.host.apollo_api + '/api/landlord/add';
		var url = config.host.apollo_api + '/admin/landlord/add';
		console.log(params);
		//url+='?'+JSON.stringify(params);
		url+='?'+JSON.stringify(params);
		url = encodeURI(url);
		console.log(url);
		return new Promise(function (resolve, reject) {
			require('request').get({url: url}, function (err, res, data) {
				return resolve(data);
			});
		});
	}
	getPoi(params) {
		var url = config.host.apollo_api+'/base/common/poi-list?query=';
		console.log(params);
		url+=params;
		console.log(url);
		return new Promise(function (resolve, reject) {
			require('request').get({url: url}, function (err, res, data) {
				return resolve(data);
			});
		});
	}
	deleteData(params) {
		var url=config.host.apollo_api+'/admin/landlord/delete';
		console.log(params);
		url+='?'+JSON.stringify(params);
		console.log(url);
		return new Promise(function (resolve, reject) {
			require('request').get({url: url}, function (err, res, data) {
				return resolve(data);
			});
		});
	}
	manageEdit(params) {
		var url=config.host.apollo_api+'/admin/landlord/detail';
		console.log(params);
		url+='?'+JSON.stringify(params);
		console.log(url);
		return new Promise(function (resolve, reject) {
			require('request').get({url: url}, function (err, res, data) {
				return resolve(data);
			});
		});
	}
	auditBack(params) {
		var url=config.host.apollo_api+'/admin/landlord/change-status';
		console.log(params);
		url+='?'+JSON.stringify(params);
		console.log(url);
		url = encodeURI(url);
		return new Promise(function (resolve, reject) {
			require('request').get({url: url}, function (err, res, data) {
				return resolve(data);
			});
		});
	}
}

module.exports = Landlord;
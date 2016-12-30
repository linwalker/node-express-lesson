var express = require('express');
var router = express.Router();
var Landlord = require('../models/Landlord');
var app = require('../app');
var needle = require('needle');
var fs = require('fs');

var layout = 'layout'; // layout path
// var co = require('co');

router.get('/', function(req, res, next) {
	let nickname=req.cookies.nickname;
	res.render(layout, {
		template: 'landlord/index',
		title: '地主',
		type:'地主',
		index:-1,
		nickname:nickname
	});
});

router.get('/manage-list', function(req, res, next) {
	//let params = url.parse(req.url).search;
	let nickname=req.cookies.nickname;
	let params= req.query;
	params.status=1;
	console.log(params);
	let promise = (new Landlord()).getList(params);
	let list = null;
	promise.then(
		function (rsp) {
			//console.log(rsp);
			rsp  = JSON.parse(rsp);
			console.log(rsp);
			if (rsp && rsp.success) {
				list = rsp.data.landlordList;
				totalPage=Math.ceil(rsp.data.totalCount/20);
				res.render(layout, {
					template: 'landlord/manage-list',
					title: '地主',
					type:'地主管理',
					list:list,
					totalPage:totalPage,
					index:0,
					edit:'manage',
					search:'manage-list',
					nickname:nickname
				});
			}
			//console.log(list);
		}
	);
});

router.get('/manage/edit',function(req,res,next) {
	let params= req.query;
	let nickname=req.cookies.nickname;
	let promise = (new Landlord()).manageEdit(params);
	let list = null;
	promise.then(
		function (rsp) {
			rsp  = JSON.parse(rsp);
			console.log(rsp);
			if (rsp && rsp.success) {
				list = rsp.data;
				console.log(list);
			}
			console.log(list);
			res.render(layout, {
				template: 'landlord/audit',
				title: '地主',
				type:'地主管理',
				list:list,
				index:0,
				nickname:nickname
			});
		}
	);
});

router.get('/audit-list', function(req, res, next) {
	let params= req.query;
	let nickname=req.cookies.nickname;
	let promise = (new Landlord()).getList(params);
	let list = null;
	promise.then(
		function (rsp) {
			rsp  = JSON.parse(rsp);
			console.log(rsp);
			if (rsp && rsp.success) {
				list = rsp.data.landlordList;
				totalPage=Math.ceil(rsp.data.totalCount/20);
			}
			console.log(list);
			res.render(layout, {
				template: 'landlord/list',
				title: '地主',
				type:'地主审核',
				list:list,
				totalPage:totalPage,
				index:1,
				edit:'audit',
				search:'audit-list',
				nickname:nickname
			});
		}
	);
});

router.get('/audit/edit', function(req, res, next) {
	let params= req.query;
	let nickname=req.cookies.nickname;
	let promise = (new Landlord()).manageEdit(params);
	let list = null;
	promise.then(
		function (rsp) {
			rsp  = JSON.parse(rsp);
			console.log(rsp);
			if (rsp && rsp.success) {
				list = rsp.data;
			}
			console.log(list);
			res.render(layout, {
				template: 'landlord/audit',
				title: '地主',
				type:'地主审核',
				list:list,
				index:1,
				nickname:nickname
			});
		}
	);
});
router.get('/audit', function(req, res, next) {
	let params= req.query;
	let promise = (new Landlord()).auditBack(params);
	let list = null;
	promise.then(
		function (rsp) {
			rsp  = JSON.parse(rsp);
			console.log(rsp);
			if (rsp && rsp.success) {
				list = rsp.data;
			}
			console.log(list);
			// res.render(layout, {
			// 	template: 'landlord/audit',
			// 	title: '地主',
			// 	type:'地主审核',
			// 	list:list,
			// 	index:1
			// });
			res.send(list)
		}
	);
});
router.get('/add', function(req, res, next) {
	let nickname=req.cookies.nickname;
	res.render(layout, {
		template: 'landlord/add',
		title: '地主',
		type:'添加地主',
		index:2,
		nickname:nickname
	});
});

// 分页ajax
router.get('/page',function(req,res){
	let params= req.query;
	let promise = (new Landlord()).getList(params);
	let list = null;
	promise.then(
		function (rsp) {
			rsp  = JSON.parse(rsp);
			console.log(rsp);
			if (rsp && rsp.success) {
				data = rsp.data;
			}
			console.log(data);
			res.send(data)
		}
	);
});

router.get('/addpost',function(req,res){
	let params= req.query;
	let insertParam = params;
	insertParam.identityBase.userId = parseInt(params.identityBase.userId);
	insertParam.identityBase.sex = parseInt(params.identityBase.sex);
	insertParam.identityLandlord.poi = parseInt(params.identityLandlord.poi);
	let promise = (new Landlord()).getAddBack(insertParam);
	//let promise = (new Landlord()).getAddBack(params);
	let list = null;
	promise.then(
		function (rsp) {
			rsp  = JSON.parse(rsp);
			console.log(rsp);
			if (rsp && rsp.success) {
				data = rsp.msg;
			}
			console.log(data);
			res.send(data)
		}
	);
});

router.get('/poi',function(req,res) {
	let params= req.query.query;
	let promise = (new Landlord()).getPoi(params);
	let list = null;
	promise.then(
		function (rsp) {
			
			console.log(rsp);
			if (rsp && rsp.success) {
				data = rsp;
			}
			console.log(data);
			res.send(data)
		}
	);
});

router.get('/delete', function(req, res, next) {
	let params = req.query;
	let promise = (new Landlord()).deleteData(params);
	let list = null;
	promise.then(
		function (rsp) {
			rsp  = JSON.parse(rsp);
			console.log(rsp);
			if (rsp && rsp.success) {
				list = rsp.data;
			}
			console.log(list);
			res.send(list);
		}
	);
});

router.get('/upload',function(req,res){
	console.log("Start Upload...");
	const file_path = 'C:\\Users\\lijun11\\Desktop\\Cii-TFgPYn2IFccUAAgEmchM5ycAADuxAMaOXgACASx365_w700_h0_c0_t0.jpg';
	let url = "http://10.10.33.144/filebroker/upload?sub_system=snc&folder=cdn&sync_quick=1&sync_place=2"
	var buffer = fs.readFileSync(file_path);
	var data = {
		zip_file: {
			buffer       : buffer,
			filename     : 'Cii-TFgPYn2IFccUAAgEmchM5ycAADuxAMaOXgACASx365_w700_h0_c0_t0.jpg',
			content_type : 'application/octet-stream'
		}
	}

	needle.post(url, data, { multipart: true }, function(err, resp, body) {
		// if you see, when using buffers we need to pass the filename for the multipart body.
		// you can also pass a filename when using the file path method, in case you want to override
		// the default filename to be received on the other end.
		console.log(body);
	});
});

module.exports = router;

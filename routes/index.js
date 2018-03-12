var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
bodyParser.urlencoded({});
var formidable = require('formidable')
var util = require('util');

var connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'chat'
    });
    connection.connect();
/* GET home page. */
router.post('/post_select', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var id = req.body.id;
	var name = req.body.name;
	if(id){
		var sql=`select * from user where id='${id}'`;
	}else{
		if(name=='zc'){
			var sql=`select * from user where username='${username}'`;
		}else if(name=='gl'){
			var sql=`select * from user`;
		}else{
			var sql=`select * from user where username='${username}' and password='${password}'`;
		}
	}
	connection.query(sql,(error,data)=>{
		res.send(data);
 	})
})

//删除用户
router.post('/post_delete', function(req, res, next) {
	var id = req.body.id;
	console.log(id)
	var sql=`delete from chat.user 
	where
	id = '${id}' ;`;
	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
})

//添加用户
router.post('/post_insert', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var sql=`INSERT INTO chat.user 
	( 
	username, 
	PASSWORD
	)
	VALUES
	( 
	'${username}', 
	'${password}'
	);`;
	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
})

router.post('/post_update', function(req, res, next) {
	var username = req.body.username;
	var password = req.body.password;
	var id = req.body.id;
	var email = req.body.email;
	var phone = req.body.phone;
	var sex = req.body.sex;
	var city = req.body.city;
	var nickname = req.body.nickname;
	if(id){
		var sql=`UPDATE chat.user 
		SET 
		nickname = '${nickname}',
		email = '${email}',
		phone = '${phone}',
		sex = '${sex}',
		city = '${city}'
		WHERE
		id = '${id}' ;`;
	}else{
		var sql=`UPDATE chat.user 
		SET 
		PASSWORD = '${password}'
		WHERE
		username = '${username}' ;`;
	}
	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
})

router.post('/post_usercollect', function(req, res, next) {
	var sckey = req.body.sckey;
	var userid = req.body.userid;
	var sql=`SELECT * FROM chat.collect_table where sckey='${sckey}' AND userid='${userid}'`;
	connection.query(sql,(error,rows,fields)=>{
 		res.send(rows);
 	})
})

router.post('/post_collselect', function(req, res, next) {
	var userid = req.body.userid;
	var title = req.body.title;
	console.log(title,'111')
	var sql=`SELECT * FROM chat.collect_table where title='${title}' AND userid='${userid}'`;
	connection.query(sql,(error,rows,fields)=>{
 		res.send(rows);
 	})
})

router.post('/post_collect', function(req, res, next) {
	var userid = req.body.userid;
	var title = req.body.title;
	var imgsrc = req.body.imgsrc;
	var type = req.body.type;
	var city = req.body.city;
	var address = req.body.address;
	var price = req.body.price;
	var author = req.body.author;
	var date = req.body.date;
	var sckey = req.body.sckey;
	if(author){
		var sql=`INSERT INTO collect_table 
		( 
		userid, 
		title,
		imgsrc,
		author,
		date,
		sckey
		)
		VALUES
		( 
		'${userid}', 
		'${title}',
		'${imgsrc}',
		'${author}',
		'${date}',
		'${sckey}'
		)`;
	}else{
		var sql=`INSERT INTO collect_table 
		( 
		userid, 
		title,
		imgsrc,
		type,
		city,
		address,
		price,
		sckey
		)
		VALUES
		( 
		'${userid}', 
		'${title}',
		'${imgsrc}',
		'${type}',
		'${city}',
		'${address}',
		'${price}',
		'${sckey}'
		)`;
	}
	console.log(sql)
	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
})

router.post('/post_colldelete', function(req, res, next) {
	var userid = req.body.userid;
	var title = req.body.title;
	var sql=`DELETE FROM chat.collect_table 
	WHERE
	userid = '${userid}'AND title='${title}'`;
	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
})

router.post('/post_userdelete', function(req, res, next) {
	var sckey = req.body.sckey;
	var userid = req.body.userid;
	var sql=`DELETE FROM chat.collect_table 
	WHERE
	sckey = '${sckey}' AND userid = '${userid}'`;
	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
})

router.post('/post_upload', function(req, res, next) {
  // 插入数据库
    var form = new formidable.IncomingForm();
    form.keepExtensions = true // 保留扩展名
    form.uploadDir = 'upload/' // 设置文件上传路径
    form.parse(req, function (err, fields, files) {
    	res.writeHead(200, {'content-type': 'text/plain'});
        res.write('received upload:\n\n');
        res.end(util.inspect({fields: fields, files: files}));
        // console.log('所有post参数', fields)
        var img_path = files.avatar.path;
        // console.log('获得的路径', img_path)
        img_path = img_path.replace(/\\/g, '\\\\')
        var positoin = img_path.indexOf('\\')
        var path1 = img_path.substring(positoin)
        img_path = 'http://localhost:3000/' + path1;
        // console.log('打印出的路径', 'http://127.0.0.1:3000/' + path1)
        // img_path = replaceAll(img_path)
        // console.log('fields', fields)
        // sql_exe(fields, res, img_path)// 在此回调函数中才能得到文件上传的路径
        var sql_query = `UPDATE user 
		SET
		imgsrc = '${img_path}'
		WHERE
		id = '${fields.userid}' `
		connection.query(sql_query, function(err, rows, fields) {
		    if (err) throw err;
			console.log("头像修改成功");
		});
    });
});

//搜索框
router.post('/post_search',function(req, res, next){
	var title = req.body.title;
	if(title==''){}else{
		var sql_query = `SELECT title,searchclass FROM spots_table WHERE title LIKE '%${title}%'
			UNION ALL
			SELECT title,searchclass FROM travel_table WHERE title LIKE '%${title}%'
			order by title desc `;
		connection.query(sql_query,(err,data)=>{
			res.send(data)
		})
	}
})

//门票查询
router.post('/post_tkselect', function(req, res, next) {
	var tkid = req.body.tkid;
	var id = req.body.id;
	if(id){
		var sql=`SELECT * FROM chat.tickets_table where id='${id}'`;
	}else{
		var sql=`SELECT * FROM chat.tickets_table where tkid='${tkid}'`;
	}
	connection.query(sql,(error,rows,fields)=>{
 		res.send(rows);
 	})
})

//酒店房型查询
router.post('/post_hlcharmber', function(req, res, next) {
	var hlid = req.body.hlid;
	var sql=`SELECT * FROM chat.charmber_table where hlid='${hlid}'`;
	connection.query(sql,(error,rows,fields)=>{
 		res.send(rows);
 	})
})

//插入订单表
router.post('/post_ddinsert', function(req, res, next) {
	var ddimg = req.body.ddimg;
	var ddname = req.body.ddname;
	var ddprice = req.body.ddprice;
	var dddate = req.body.dddate;
	var xtdate = req.body.xtdate;
	var ddnum = req.body.ddnum;
	console.log(ddnum)
	var allprice = req.body.allprice;
	var linkman = req.body.linkman;
	var phone = req.body.phone;
	var message = req.body.message;
	var userid = req.body.userid;
	var ddstate = req.body.ddstate;
	var sql=`INSERT INTO chat.indent_table 
	( 
	ddimg, 
	ddname, 
	ddprice, 
	dddate, 
	xtdate, 
	ddnum, 
	allprice, 
	linkman, 
	phone, 
	message, 
	userid, 
	ddstate 
	)
	VALUES
	( 
	'${ddimg}', 
	'${ddname}', 
	'${ddprice}', 
	'${dddate}', 
	'${xtdate}', 
	'${ddnum}', 
	'${allprice}', 
	'${linkman}', 
	'${phone}', 
	'${message}', 
	'${userid}', 
	'${ddstate}' 
	);`;
	connection.query(sql,(error,data)=>{
		console.log(sql);
 		res.send(data);
 	})
})

//查询订单表
router.post('/post_ddselect', function(req, res, next) {
	var userid = req.body.userid;
	var sql=`SELECT * FROM chat.indent_table where userid='${userid}'`;
	connection.query(sql,(error,rows,fields)=>{
 		res.send(rows);
 	})
})

router.get('/get_insert', function(req, res, next) {
	var username = req.query.username;
	console.log(username);
	var sql=`select * from user where username='${username}' ORDER BY ID DESC LIMIT 0,10`;
	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
})

router.get('/get_contentslist', function(req, res, next) {
	var title = req.query.title;
	var id = req.query.id;
	var city = req.query.English;
	var type = req.query.type;
	var sql;
	console.log(city);
	//门票页面：城市
	if(city=="all"){
		if(type=="all"||type==undefined){
			sql = `select * from spots_table ORDER BY ID DESC LIMIT 0,10`;
		}else{
			sql = `SELECT * FROM spots_table WHERE TYPE='${type}' ORDER BY ID DESC LIMIT 0,10`;
		}
	}else if(city){
		if(type=="all"||type==undefined){
			sql = `select * from spots_table where English='${city}' ORDER BY ID DESC LIMIT 0,10`;
		}else{
			sql = `SELECT * FROM spots_table WHERE TYPE='${type}' AND English='${city}' ORDER BY ID DESC LIMIT 0,10`;
		}
	}else if(title){
		sql = `SELECT * FROM spots_table WHERE title='${title}'`;
	}else{
		sql = `SELECT * FROM spots_table WHERE id='${id}'`;
	}
 	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
});

router.get('/get_travel', function(req, res, next) {
	var city = req.query.city;
	var english = req.query.english;
	var title = req.query.title;
	var sql;
	if(city=="all"){
		if(english=="all"||english==undefined){
			sql = `select * from travel_table  ORDER BY ID DESC LIMIT 0,10`;
		}else{
			sql = `SELECT * FROM travel_table WHERE english='${english}' ORDER BY ID DESC LIMIT 0,10`;
		}
	}else if(city){
		if(english=="all"||english==undefined){
			sql = `select * from travel_table where city='${city}' ORDER BY ID DESC LIMIT 0,10`;
		}else{
			sql = `SELECT * FROM travel_table WHERE english='${english}' AND city='${city}' ORDER BY ID DESC LIMIT 0,10`;
		}
	}else{
		sql = `SELECT * FROM travel_table WHERE title='${title}'`;
	}
 	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
});

router.get('/get_hotel', function(req, res, next) {
	var city = req.query.city;
	var type = req.query.type;
	var title = req.query.title;
	var sql;
	//门票页面：城市
	if(city=="all"){
		if(type=="全部"||type==undefined){
			sql = `select * from hotel_table  ORDER BY ID DESC LIMIT 0,10`;
		}else{
			sql = `SELECT * FROM hotel_table WHERE TYPE='${type}' ORDER BY ID DESC LIMIT 0,10`;
		}
	}else if(city){
		if(type=="全部"||type==undefined){
			sql = `select * from hotel_table where city='${city}' ORDER BY ID DESC LIMIT 0,10`;
		}else{
			sql = `SELECT * FROM hotel_table WHERE TYPE='${type}' AND city='${city}' ORDER BY ID DESC LIMIT 0,10`;
		}
	}else{
		sql = `SELECT * FROM hotel_table WHERE title='${title}'`;
	}
 	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
});

router.get('/get_spotimg', function(req, res, next) {
	var title = req.query.title;
	var sql=`select * from spots_img where title='${title}'`;
	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
})

router.get('/get_aboutfj', function(req, res, next) {
	var about = req.query.about;
	var sql=`select * from aboutfj_table where about='${about}'`;
	connection.query(sql,(error,data)=>{
 		res.send(data);
 	})
})

module.exports = router;

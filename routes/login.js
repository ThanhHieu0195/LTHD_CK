var express = require('express');
var router = express.Router();
var path = require('path');

/*----------  database  ----------*/

function config_mysql() {
	// body...
	mysql      = require('mysql');
	mysql_cnn = mysql.createConnection({
	  host     : 'localhost',
	  user     : 'root',
	  password : '',
	  database : 'trumpstagram'
	});

	mysql_cnn.connect();
}

function setQuery(sql) {
	mysql_query = sql;
}

function query() {
	mysql_cnn.query(mysql_query, function(err, rows, fields) {
	  if (err) throw err;

	  console.log('The solution is: ', rows[0].solution);
	});

	mysql_cnn.end();
}


/* GET users listing. */
router.get('/', function(req, res, next) {
   res.sendFile(path.join(__dirname, '../public', 'login.html'));
});

router.post('/', function(req, res){
   var account = req.body;
   sql = "select count(*) as num_acc from account where username = ? and password = ?"; 

   config_mysql();
   mysql_cnn.query(sql, [account.username, account.password],function(err, rows, fields) {
	  if (err) throw err;

	  if (rows[0].num_acc == 1) {
	  	res.render('dashboard', {title:"giao diện sử dụng"});
	  } else {
   		res.sendFile(path.join(__dirname, '../public', 'login.html'));
	  }
	});

	mysql_cnn.end();
});

module.exports = router;



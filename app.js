	/////////////////////////
	//					   //
	//  import || require  //
	//					   //
	/////////////////////////

var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var mysql = require('mysql');
	/////////////////////////
	//					   //
	//   use && varlible   //
	//					   //
	/////////////////////////

var port = process.env.PORT || 3100;
var con1 = mysql.createConnection({
            host:"localhost",
            user:"root",
            password:"",
            database:"banking"
        });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

	/////////////////////////
	//					   //
	//   	  router	   //
	//					   //
	/////////////////////////

app.post('/post_test',function(req,res){
	var account_number = req.body.account_number;
	var branch_name = req.body.branch_name;
	var balance = req.body.balance;
	var sql = 'INSERT INTO `account`(`account_number`, `branch_name`, `balance`) VALUES \
	("'+account_number+'","'+branch_name+'",'+balance+')';
	con1.query(sql,function (err,rows) {
        if (err) throw err; 
        res.send('sucsess');
    });
});

app.get('/getAllAccount/:id',function(req,res){
	var sql = "SELECT * FROM `account` where account_number='"+req.params.id+"'";
	con1.query(sql,function(err,rows){
		if(err) throw err;
		res.json(rows);
	});
});

app.delete('/deleteData/:id', function (req, res) {
  var sql = "DELETE FROM `account` WHERE account_number='"+req.params.id+"'";
	con1.query(sql,function(err,rows){
		if(err) throw err;
		res.send('Delete sucsess!!');
	});
})

app.put('/updateData', function (req, res) {
	var acc = req.body.account_number;
	var bra = req.body.branch_name;
	var bal = req.body.balance;
  	var sql = "UPDATE `account` SET `branch_name`=?,`balance`=? WHERE account_number=?";
	con1.query(sql,[bra,bal,acc],function(err,rows){
		if(err) throw err;
		res.send('Update sucsess!!');
	});
})

app.get('/', function (req, res) {
  res.send('Hello World')
});
 
app.listen(port)
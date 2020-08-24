var express = require('express');
var mysql=require("mysql");
var router = express.Router();



/*
drop database bank;
create database bank;
use bank;
create table accounts(accno int primary key,name text,balance float,doc date);
insert into accounts values(101,'Ram',10000.56,'2011-11-11');
insert into accounts values(102,'Sachin',20000.56,'2011-11-11');
insert into accounts values(103,'Sunil',30000.56,'2011-11-11');
insert into accounts values(104,'Mohan',40000.56,'2011-11-11');
insert into accounts values(105,'Pratap',50000.56,'2011-11-11');
select * from accounts;



*/


//create a connection with mysql

var connection=mysql.createConnection({
    database:"bank",
    user:"root",
    password:"admin",
    port:3306,
    host:"localhost"
});




/* GET all Accounts */
router.get('/accounts', function(req, res, next) {
  
  
    connection.query("SELECT * FROM ACCOUNTS",function(error,data){

        if(error)
        return res.send(""+error);
        else
        res.json(data);
    });
  
  
});


/* GET Account by accno : */
router.get('/accounts/:accno', function(req, res, next) {
    var accno=parseInt(req.params.accno);
    
      
    connection.query("SELECT * FROM ACCOUNTS WHERE ACCNO=?",[accno],function(error,data){
        if(error)
        return res.send(""+error);
        else
        res.json(data[0]);
    });
  


});
  
/* DELETE Account by accno : */
router.delete('/accounts/:accno', function(req, res, next) {
    
    var accno=parseInt(req.params.accno);
          
    connection.query("DELETE FROM ACCOUNTS WHERE ACCNO=?",[accno],function(error,data){
        if(error)
        return res.send(""+error);
     
        connection.query("SELECT * FROM ACCOUNTS",function(error,data){

            if(error)
            return res.send(""+error);
            else
            res.json(data);
        });
      


    });
  
});
  
/* UPDATE Account by accno : */
router.put('/accounts/:accno', function(req, res, next) {
    
    var accno=parseInt(req.params.accno);
    
    var account=req.body;
    
   

    connection.query("UPDATE ACCOUNTS SET NAME=?,BALANCE=?,DOC=? WHERE ACCNO=?",[account.name,account.balance,account.doc,accno],function(error,data){
        if(error)
        return res.send(""+error);
     
        connection.query("SELECT * FROM ACCOUNTS",function(error,data){

            if(error)
            return res.send(""+error);
            else
            res.json(data);
        });
      
    });
    
    
});


/* ADD Account  */
router.post('/accounts', function(req, res, next) {
        
    var accountData=req.body;

    connection.query("INSERT INTO ACCOUNTS SET ?",[accountData],function(error,data){
        if(error)
        return res.send(""+error);
     
        connection.query("SELECT * FROM ACCOUNTS",function(error,data){

            if(error)
            return res.send(""+error);
            else
            res.json(data);
        });
      
    });

});

module.exports = router;

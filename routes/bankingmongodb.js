var express = require('express');
var mongoose=require("mongoose");
var router = express.Router();


var dbName = 'bank';
var connectionString = 'mongodb://localhost:27017/'+dbName;

//create a connection with mmongodb

mongoose.connect(connectionString,function(err){
    if(err)
    return console.err(""+err);
    console.log("Connection established with MongoDB");
});



var userSchema = new mongoose.Schema({
  accno: Number,
  name: String,
  balance: Number,
  doc: String,
});


var  Account=mongoose.model('account', userSchema);



/* GET all Accounts */
router.get('/accounts', function(req, res, next) {
  
     Account.find(function(err,data){
        if(err)
        return res.send(""+err);
        res.json(data);
     });

  
});


/* GET Account by accno : */
router.get('/accounts/:accno', function(req, res, next) {
    var acNo=parseInt(req.params.accno);
    
    Account.findOne({accno:acNo},function(err,data){
        if(err)
        return res.send(""+err);
        res.json(data);
     });


    


});
  
/* DELETE Account by accno : */
router.delete('/accounts/:accno', function(req, res, next) {
    
    var acNo=parseInt(req.params.accno);
    
    
    Account.remove({accno:acNo},function(err,data){
        if(err)
        return res.send(""+err);

        Account.find(function(err,data){
            if(err)
            return res.send(""+err);
            res.json(data);
         });
    
        });


    
});
  
/* UPDATE Account by accno : */
router.put('/accounts/:accno', function(req, res, next) {
    
    var acNo=parseInt(req.params.accno);
    
    Account.findOne({accno:acNo},function (error,account){
        if(error)
        return res.send(error);
        
        for (prop in req.body) {
            account[prop] = req.body[prop];
          }

    account.save(function(err,result){
            Account.find(function(err,data){
                if(err)
                return res.send(err);
                res.json(data);
               });
        });
       
}); 
   
});


/* ADD Account  */
router.post('/accounts', function(req, res, next) {
        
    var account=new Account(req.body);

    account.save(function(err,result){
        Account.find(function(err,data){
            if(err)
            return res.send(err);
            res.json(data);
           });
    });

});

module.exports = router;

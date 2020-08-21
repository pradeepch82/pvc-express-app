var express = require('express');
var router = express.Router();


/* GET all Accounts */
router.get('/', function(req, res, next) {

    var user=req.query.userid;
    var pwd=req.query.pwd;
    
    var result="GET    : =>  Hello "+user+" Your password is "+pwd;

  res.send(result);
});


/* GET Account by accno : */
router.post('/', function(req, res, next) {

    var user=req.body.userid;
    var pwd=req.body.pwd;
    
    var result="POST  : =>  Hello "+user+" Your password is "+pwd;

  res.send(result);

});

module.exports = router;

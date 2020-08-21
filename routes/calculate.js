var express = require('express');
var router = express.Router();




/* GET Account by accno : */
router.post('/', function(req, res, next) {

    var a=parseInt(req.body.a);
    var b=parseInt(req.body.b);
    var action=req.body.action;
    
   result="";

   if(action=="ADD")
   result="Addtion :"+(a+b);
   else if(action=="SUB")
   result="Sustraction :"+(a-b);
   else if(action=="MUL")
   result="Multiplkcation :"+(a*b);
   if(action=="DIV")
   result="Division :"+(a/b);
   if(action=="MOD")
   result="Moduls  :"+(a%b);
   
   res.send(result);

});

module.exports = router;

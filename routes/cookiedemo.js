var express = require('express');

var router = express.Router();

    
router.get('/', function(req, res, next) {

 var counter=req.cookies.counter;

if(!counter)
{
    res.cookie("counter","1",{expires:new Date("September 21,2020").getMilliseconds()});
    res.send("Hello User You are visisting "+counter+" times");

}
else
{
var value=parseInt(req.cookies.counter);
value++;
res.cookie("counter",""+value,{expires:new Date("September 21,2020").getMilliseconds()});

if(value>3)
{
    res.send("Hello User You are eligible for Prize of Rs "+(value*1000)+"/-");
}
else{
   res.send("Hello User You are visiting  "+value+" times");
}

}



});


module.exports = router;

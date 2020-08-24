var express = require('express');
var router = express.Router();



router.post('/', function(request, response) { 

    
    var product=request.body.product;
    var quantity=request.body.quantity;
    var action=request.body.action;

    if(action=="ADD"){

    request.session[product]=quantity;
    response.redirect("/shop.html");

    }else  if(action=="REMOVE"){
        delete request.session[product];
        response.redirect("/shop.html");
    }
    else     if(action=="SHOWALL"){
  
    var data="";
    console.log(request.session["cookie"]);
    console.log("Session ID ",request.session["cookie"]);
    
    for(prop in request.session)
      {
      data=data+"<br/>"+prop+" => "+request.session[prop];
      } 

    response.send("Products In the Cart <hr/>"+data);
    }
    else if(action=="PAYAMOUNT"){
         response.send("Payment Logic goes here");
   }
    else if(action=="LOGOUT"){
        request.session.destroy(function(err){
         if(err)
         response.send(err);
        })
        response.redirect("/shop.html");
   }        
});

module.exports = router;


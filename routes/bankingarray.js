var express = require('express');
var router = express.Router();




//datasource
var accounts=[
    {accno:101,name:'Ramesh',balance:1000.56,doc:new Date("July 31,2000")},
    {accno:102,name:'Mohan',balance:2000.56,doc:new Date("April 11,1995")},
    {accno:103,name:'Pradeep',balance:3000.56,doc:new Date("June 12,2005")},
    {accno:104,name:'Sunil',balance:4000.56,doc:new Date("May 11,2019")},
    {accno:105,name:'Girish',balance:5000.56,doc:new Date("January 21,2002")},
];




/* GET all Accounts */
router.get('/accounts', function(req, res, next) {
  res.json(accounts);
});


/* GET Account by accno : */
router.get('/accounts/:accno', function(req, res, next) {
    var accno=parseInt(req.params.accno);
    var account=accounts.filter((account)=>account.accno==accno)[0];
    res.json(account);

});
  
/* DELETE Account by accno : */
router.delete('/accounts/:accno', function(req, res, next) {
    
    var accno=parseInt(req.params.accno);
    accounts=accounts.filter((account)=>account.accno!=accno);
    res.json(accounts);

});
  
/* UPDATE Account by accno : */
router.put('/accounts/:accno', function(req, res, next) {
    
    var accno=parseInt(req.params.accno);
    
    var accountData=req.body;
    
    accounts.forEach((account,index)=>{
        if(accno==account.accno)
          accounts[index]=accountData;
    });
    
    res.json(accounts);
});


/* ADD Account  */
router.post('/accounts', function(req, res, next) {
        
    var accountData=req.body;
    accounts.push(accountData);
    res.json(accounts);
});

module.exports = router;

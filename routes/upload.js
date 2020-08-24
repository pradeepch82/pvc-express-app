var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/',function(request, response) {
 
  if (!request.files)
  return response.status(400).send('No files were uploaded.');
 
let  resume= request.files.resume;

resume.mv("./uploads/"+request.files.resume.name,function(err){
if (err)
 return response.status(500).send(err);
 response.send("File Uploaded successfully");
});

});


/* GET users listing. */
router.post('/multiple',function(request, response) {
  
   if (!request.files)
   return response.status(400).send('No files were uploaded.');
 

 for( i in request.files.photos) 
{ 
 console.log("Photo :",i);

 photo=request.files.photos[i];

 photo.mv("./uploads/"+photo.name,function(err){
 if (err)
  return response.status(500).send(err);
  });
}
response.send("All Files Uploaded Successfully");  

 });
 
module.exports = router;

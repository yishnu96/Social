const express = require('express');
const app = express();
const port = 8000;


//Server is UP
app.listen(port,function(err){
    if(err){
        console.log(`Error : ${err}`)
    }
    console.log(`Server running on PORT : ${port}`)
})
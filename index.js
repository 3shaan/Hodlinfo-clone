const express = require('express');
const cors = require('cors')
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// middlewares

app.use(cors());

app.use(express.static(path.join(__dirname, "public")))


//get the html files
app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/public/index.html')
})








//serrver listner

app.listen(port, ()=>{
    console.log('server is running on'+ port)
})
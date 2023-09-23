const express = require('express');
const cors = require('cors')
const path = require('path');
require("dotenv").config();
const mongoose = require('mongoose');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const tradersSchema = require('./schema');

// middlewares

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")))


//mongoose connecton
mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.00o20sl.mongodb.net/hodlinfo`,{
    useNewUrlParser: true, useUnifiedTopology: true
})

//connection check
mongoose.connection.on('connected',()=>{
    console.log('mongoose connected')
})


//get the html files
app.get('/', (req,res)=>{
    res.sendFile(__dirname+'/public/index.html');
})


// get the data from api and save it to mongodb

app.post('/traders', async (req,res)=>{
    try {
        const allData = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const dataArray = Object.values(allData.data);
        const first10Object = dataArray.slice(0,10);
        
        const storeData = first10Object.map(data=>({
            name:data.name,
            last:data.last,
            buy:data.buy,
            sell:data.sell,
            volume:data.volume,
            base_unit:data.base_unit,
            at:data.at,
        }))
        // console.log(storeData);

        for(const obj of storeData){
            const tradersData = new tradersSchema(obj);
            await tradersData.save();
        }
        res.status(200).json('Data save successfully')
        
    } catch (error) {
        console.log(error.message)
       return res.status(400).json('there was a server side error');
    }
})


//get all the traders 

app.get('/traders',async(req,res)=>{
    try {
        const results = await tradersSchema.find();
        console.log(results);
        return res.status(200).json(results);
    } catch (error) {
        return res.status(400).json('there was a server side error'); 
    }
})


// app.delete('/traders', async(req,res)=>{
//     try {
//        await tradersSchema.deleteMany()
//        res.status(200).json("deleted")
        
//     } catch (error) {
//         console.log(error)
//     }
// })



//server listener

app.listen(port, ()=>{
    console.log('server is running on'+ port)
})
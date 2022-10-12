const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 3000;
const mongoose = require('mongoose');



app.get('/', (req, res) => {
    res.send('Hello World');
})
app.get('/w', (req, res) => {
    console.log("Hello World");
    const name = req.query.name;
    res.send(`Hello ${name}`);
})

app.listen(PORT, async () => {
    try{
        console.log(process.env.MONGO_URI)
        const conn = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log("Connected to MongoDB");
    }
    catch(err){
        console.log(err);
    }

    console.log(`http://localhost:${PORT}`);
})
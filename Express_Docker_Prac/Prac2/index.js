const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/test12';

app.get('/', (req, res) => {
    res.send('Hello World');
})



app.listen(PORT,async () => {
    try{
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB');
    }
    catch(err){
        console.log(err);
    }
    console.log("--->>>>",MONGO_URI);
    console.log(`http://localhost:${PORT}`);
} );



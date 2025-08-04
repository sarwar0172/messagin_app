const express = require('express');
const cookiParser = require('cookie-parser');
const cors= require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/dbConnect');

dotenv.config();

const port = process.env.PORT 
const app = express();

// database connection 
connectDB();

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
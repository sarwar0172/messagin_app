const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookiParser = require('cookie-parser');
const cors= require('cors');
const connectDB = require('./config/dbConnect');
const bodyParser = require('body-parser');
const authRoute = require('./routes/authRoute');



const port = process.env.PORT 
const app = express();

// middlewares
app.use(express.json());
app.use(cookiParser());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}))

// database connection 
connectDB();

app.use('/api/auth', authRoute);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
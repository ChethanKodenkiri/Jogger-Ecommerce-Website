const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

const app = express();  

app.use(cookieParser());  

dotenv.config({path:'./config.env'});
const PORT = process.env.PORT;
require('../Server/router/auth');
app.use(express.json());
app.use(require('../Server/router/auth'));

app.get('/', (req, res) => {
    res.send('Hello World');
});


app.listen(PORT, () => {
    console.log(`Server is running at ${PORT}`);
});

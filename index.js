require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/dbConnection.js');

connectDB();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser());  


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views")); 
app.use(express.static(path.join(__dirname, '/css/style')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', require('./routes/authRoute.js'));
app.use('/', require('./routes/viewRoute.js'));



const PORT = process.env.PORT ;
app.listen(PORT, () => {
    console.log(`Server started at port: ${PORT}`);
});

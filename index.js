require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const connectDB = require('./config/dbConnection.js');


connectDB();
const app = express();
const PORT = process.env.PORT ;
const server  = app.listen(PORT, () => {
 console.log(`Server started at port: ${PORT}`);
});
const io = require("socket.io")(server,{
    pingTimeout:60000,
    cors:{
        origin:"*"
    }
})

io.on("connection",(socket)=>{
    console.log("socket io connected"); 
    
    socket.on("login details",(userdata)=>{
        console.log(userdata);
        
        socket.user = userdata;
    })

    socket.on("getuser details",()=>{
        socket.emit("user details",socket.user)
    })
})

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use(cookieParser());  


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, "views")); 
app.use(express.static(path.join(__dirname, '/css/style')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/user', require('./routes/authRoute.js'));
app.use('/', require('./routes/viewRoute.js'));






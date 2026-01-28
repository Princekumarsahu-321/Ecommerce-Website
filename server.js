const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');
const bodyParser=require('body-parser');
app.use(bodyParser.json()); 
const PORT=process.env.PORT || 3000;

// const passport = require('passport');
// const LocalStrategy=require('passport-local').Strategy;


// const Person=require('./module/person');
// app.use(express.json()); 

const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request Made to: ${req.originalUrl}`);
    next();
    
}

app.use(logRequest);

app.use(passport.initialize());

const localAuthMiddleware=passport.authenticate('local',{session:false})


app.get('/',localAuthMiddleware ,function(req, res){
    res.send("welcome to my hotel");
});


const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);


const menuItemRoutes = require('./routes/menuItemRoutes');
app.use('/menuItem',menuItemRoutes);



app.listen(PORT, () => {
    console.log('server is on 3000 port');
});
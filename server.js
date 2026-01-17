const express = require('express');
const app = express();
const db=require('./db');
require('dotevn').config();

// const passport = require('passport');
// const localStrategy = require('passport-local').Strategy;

// const Person=require('./models/Person');

// const { functions } = require('lodash');

const bodyparser=require('body-parser');
app.use(bodyparser.json());
const PORT=process.env.PORT || 3000;

const logRequest=(req,res,next)=>{
    console.log('[${new date().tolocalString()}] Request Made to:${req.originalUrl}');
    next();
}

app.use(passport.initialize());

app.use(localRequest);

passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    try{
        console.log('Received  credentials:',USERNAME,password);
        const user= await Person.findOne({username:USERNAME});
        if(!user)
            return done (null,false,{message:'Incorrect username'});
        const ispasswordMatch=user.password === password ? true : false;
        if(ispasswordMatch){
            return done(null,user);
        }else{
            return done(null,false,{message:'Incorrect password'});
        }

    }
    catch (err){
        return done(err);

    }
}))



const LocalAuthMiddleware=passport.authenticate('local',{session:false})
app.get('/',function (req, res) {
    res.send('welcome to my hotel')
})

const personRoutes=require('./routes/personRoutes');
const menuItemRoutes=require('./routes/menuItemRoutes');


app.use('./person',personRoutes);
app.use('./menu',menuItemRoutes);



app.listen(3000,()=>{
    console.log('listening on port 3000');
    
})
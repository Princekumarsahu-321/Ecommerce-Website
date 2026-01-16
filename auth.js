const express = require('express');
const app = express();
const db=require('./db');
require('dotevn').config();
const passport = require('./auth');
// const localStrategy = require('passport-local').Strategy;
// const Person=require('./models/Person');
const bodyparser=require('body-parser');
app.use(bodyparser.json());
const PORT=process.env.PORT || 3000;

const logRequest=(req,res,next)=>{
    console.log('[${new date().tolocalString()}] Request Made to:${req.originalUrl}');
    next();
}

app.use(localRequest);

passport.use(new LocalStrategy(async(USERNAME,password,done)=>{
    try{
        // console.log('Received  credentials:',USERNAME,password);
        const user= await Person.findOne({username:USERNAME});
        if(!user)
            return done (null,false,{message:'Incorrect username'});
        const ispasswordMatch= await user.comparePassword(password);
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

module.exports=passport;

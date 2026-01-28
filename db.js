const mongoose=require('mongoose');
require('dotenv').config();
// const mongoURL='mongodb://localhost:27017/resturent'



// const mongoURL='mongodb+srv://princestm321_db_user:<db_password>@cluster0.it7rokd.mongodb.net/'
// -------server connection-----

const mongoURL=process.env.MONODB_URL_LOCAL;

// const mongoURL=process.env.MONGODB_URL;

// -----------server-------
// mongoose .connect(mongoURL,{ 
// });

// mongoose.connect(mongoURL,{
//     useNewParser:true,
//     useUnifiedTopology:true
// })

mongoose.connect(process.env.MONGODB_URL_LOCAL)
.then(() => console.log("MongoDB  connected "))
.catch(err => console.log("MongoDB error", err.message));


const db=mongoose.connection;

db.on('connected',()=>{
    console.log("mongoose connected");
    
});

db.on('error',()=>{
    console.log("mongoose error");
    
});

db.on('disconnected',()=>{
    console.log("mongoose disconnected");
    
});


module.exports=db;




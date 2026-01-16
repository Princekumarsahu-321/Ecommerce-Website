const mongoose=require('mongoose');
require('dotenv').config();


// const mongoURL=process.env.MONGODB_URL_LOCAL
const mongoURL=process.env.MONGODB_URL;

// const mongoURL='mongodb+srv://princekumarsahu321_db_user:QCG7PAAChiCnEBOQ@cluster0.jnricrd.mongodb.net/'


mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})


const db=mongoose.connection;


db.on('connected',()=>{
    console.log('Connected to Mongodb server');

});

db.on('connected',(err)=>{
    console.log(' Mongodb Connected  error',err);
    
});



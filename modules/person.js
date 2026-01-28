const mongoose=require('mongoose');
const bcrypt=require('bcrypt');

const personSchema=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    age:{
        type:Number,
        require:true
    },
    work:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true
    },
    address:{
        type:String,
        require:true
    },
    username:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
})


personSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});




// personSchema.pre('save',async function(next){
//     const person=this;
//     if(!person.isModified('passport')) return next();
//     // if (!person.isModified('password')) return next();
//     try{
//         const salt=await bcrypt.genSalt(10);

//         const hashPassword=await bcrypt.hashPassword(person.password,salt);
//         // const hashedPassword = await bcrypt.hash(person.password, salt);
//         person.password=hashPassword;
//         next();
//     }catch(err){
//         return next(err);
//     }
// })


// // Hashing password
// personSchema.pre('save', async function() {
//   if (!this.isModified('password')) return; // correct field name

//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });



// // Compare password
// personSchema.methods.comparePassword = async function(candidatePassword) {
//   if (!candidatePassword || !this.password) return false;
//   return await bcrypt.compare(candidatePassword, this.password);
// };



personSchema.methods.comparePassword=async function(candidatePassword){
    try{
        const isMatch=await bcrypt.compare(candidatePassword,this.password);
        return isMatch;

    }catch(err){
        throw err;


    }
}

module.exports=mongoose.model('person',personSchema)


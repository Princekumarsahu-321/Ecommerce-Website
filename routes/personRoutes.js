const express=require('express');
const router=express.Router();
const Person = require('./../module/person');
const {jwtAuthMiddleware,generateToken}=require('./../jwt');


router.post('/singup', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new Person(data);
        const response = await newPerson.save();
        console.log('person saved');

        const payload={
            id:response.id,
            username:response.username
        }
        console.log(JSON.stringify(payload));
        const token=generateToken(payload);
        
        // const token=generateToken(response.username);
        console.log("Token is :",token);
        
        res.status(201).json({response: response,token:token});

    } catch (err) {
        console.log(err);
        res.status(400).json({ error: err.message });
    }
});

// router.post('/login',async(req,res)=>{

//     try{
//         const {username,password} = req.body;

//      const user = await Person.findOne({username:username});

//      if(!user || !(await user.comparePassword(password))){
//          return res.status(401).json({error: 'Invalid username or  password '});
//         }

//         const payload={
//             id:user.id,
//             username:user.username
//         }
//         const token = generateToken(payload);

//         res.json({token})

//     }catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await Person.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const payload = { id: user._id, username: user.username };
    const token = generateToken(payload);

    res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


router.get('/profile',jwtAuthMiddleware,async(req,res)=>{

    try{
        const userData=req.user;
        console.log("User Data:",userData);

        const userId=userData.id;
        const user=await Person.findById(userId);

        res.status(200).json({user});

    }catch (err) {
     console.error(err);
     res.status(500).json({ error: 'Internal Server Error' });
    }
})



router.get('/',jwtAuthMiddleware, async (req, res) => {
    try {
        const data = await Person.find();
        console.log('persons fetched');
        res.status(200).json(data);

    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/:workType',async(req,res)=>{
    try{
        const workType = req.params.workType;
        if (workType == 'chef' || workType == 'manager' || workType == 'waiter') {

            const response=await Person.find({work:workType});
            console.log('response fetched');
            res.status(200).json({ response });

        }else{
           res.status(404).json({ error: 'invalid worktype' });
        }

    }catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }   
})

router.put('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const updatePersonData=req.body;

        const response=await Person.findByIdAndUpdate(personId,updatePersonData,{
            new:true,
            runValidators:true,

        })
        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data updated');
        res.status(200).json(response);
        

    }catch(error){
        console.log(error);
        res.status(500).json({error:'internal server error'});
        
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;

        const response=await Person.findByIdAndDelete(personId);


        if(!response){
            return res.status(404).json({error:'person not found'});
        }
        console.log('data deleted');
        res.status(200).json({message:'person data deleted success'});

    }catch(error){
        console.log(error);
        res.status(500).json({error:'internal server error'});
        
    }

})

module.exports=router

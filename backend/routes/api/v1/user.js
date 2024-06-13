const express=require('express')
const userRouter=express.Router()
const zod=require('zod')
const {User}=require('../../../db');
const jwt= require('jsonwebtoken');
userRouter.get('/',(req,res)=>{
    res.send("Hello from user route")
});

const signupSchema=zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

userRouter.post('/signup',async(req,res)=>{
    const body=req.body;
    const {success}=signupSchema.safeParse(req.body)
    if(!success){
        return res.json({
            message:"Incorrect Credentials"
        })
    }

    const user=User.findOne({username:body.username})
    
    if(user._id){
        console.log(user.username,user.firstName)
        return res.json({
            message:"User with this username already exists"
        })
    }

    const dbUser=await User.create(body)
    const token=jwt.sign({
        userId:dbUser._id
    },process.env.JWT_SECRET)

    res.json({
        message:"User created successfully",
        token:token 
    })
})

const signinBody=zod.object({
    username:zod.string().email(),
    password:zod.string()
})

userRouter.post('/signin',async (req,res)=>{
    const {success}=signinBody.safeParse(req.body)
    if(!success){
        return res.status(411).json({
            message:"Incorrect inputs"
        })
    }

    const user=await User.findOne({
        username:req.body.username,
        password:req.body.password
    })

    if(user){
        const token=jwt.sign({
            userId:user._id 
        },process.env.JWT_SECRET)

        res.json({
            token:token 
        })
        return;
    }

    res.status(411).json({
        message:"Error while logging in"
    })
})

const updateBody=zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})

userRouter.put('/',async (req,res)=>{
    const {success}=zod.safeParse(req.body)
    if(!success){
        res.status(411).json({
            message:"Error while updating information"
        })
    }

    await User.updateOne(req.body,{
        id:req.userId 
    })

    res.json({
        message:"Updated successfully"
    })
})

userRouter.get('/bulk',async (req,res)=>{
    const filter=req.query.filter || "";

    const users=await User.find({
        $or:[{
            firstName:{
                "$regex":filter 
            }
        },
        {
            lastName:{
                "$regex":filter 
            }
        }
    ]
    })

    res.json({
        user:users.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id
        }))
    })
})
 
module.exports={
    userRouter
}
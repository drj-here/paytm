const {authMiddleware}=require('../../../middleware')
const {Account}=require('../../../db')
const mongoose=require('mongoose')
const express=require('express')
const accountRouter=express.Router()

accountRouter.post('/',async(req,res)=>{

    const response=await Account.create({
        userId:new mongoose.Types.ObjectId(req.body.userId),
        balance:req.body.balance
    })

    if(!response) 
        return res.status(411).json({
        message:"You are not authorized to do this"
    })

    return res.status(201).json({
        message:"Account created successfully"
    })
})

accountRouter.get('/balance',authMiddleware,async (req,res)=>{

    const account=await Account.findOne({
        userId:req.userId 
    })

    res.json({
        balance:account.balance
    })
})

accountRouter.post('/transfer',authMiddleware,async (req,res)=>{
    const session=await mongoose.startSession()

    session.startTransaction()
    const {amount,to}=req.body;

    const account=await Account.findOne({userId:req.userId}).session(session)

    if(!account || account.balance<amount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Insufficient balance"
        })
    }

    const toAccount=await Account.findOne({userId:to}).session(session)

    if(!toAccount){
        await session.abortTransaction()
        return res.status(400).json({
            message:"Invalid account"
        })
    }

    await Account.updateOne({userId:req.userId},{$inc:{balance:-amount}}).session(session)
    await Account.updateOne({userId:to},{$inc:{balance:amount}}).session(session)

    await session.commitTransaction()
    res.json({
        message:"Transaction successful"
    })
})

module.exports=accountRouter;
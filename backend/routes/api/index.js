const express=require('express');
const { userRouter } = require('./v1/user');
const accountRouter = require('./v1/account');
const v1Router=express.Router()

v1Router.use('/users',userRouter);
v1Router.use('/account',accountRouter)
module.exports={
    v1Router
}
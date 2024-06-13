const express=require('express');
const { v1Router } = require('./api');
const api=express.Router()

api.use('/v1/',v1Router);
module.exports={api}
const jwt=require('jsonwebtoken')

const authMiddleware=(req,res,next)=>{
    const authHeader=req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(403).json({
            message:"You are not authorized"
        })
    }

    const token=authHeader.split(' ')[1]

    try {
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.userId=decoded.userId
        next()

    } catch (error) {
        return res.status(403).json({})
    }
}

module.exports={
    authMiddleware
}
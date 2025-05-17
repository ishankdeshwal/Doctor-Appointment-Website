import jwt from 'jsonwebtoken'

const AuthUser=async(req,res,next)=>{
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({success:false,message:'Not Authorized Login Again'})
        }
        const token = authHeader.split(' ')[1];
        if (!token) {
            return res.status(401).json({success:false,message:'Token not provided'})
        }
        const token_decode = jwt.verify(token,process.env.JWT_SECRET)
        if (!token_decode || !token_decode.id) {
            return res.status(401).json({success:false,message:'Invalid Token'})
        }
        req.userId = token_decode.id;

        next()

    } catch (error) {
        return res.status(401).json({success:false,message:'Invalid Token'})
    }
}

export default AuthUser
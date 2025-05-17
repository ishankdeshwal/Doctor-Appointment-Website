import jwt from 'jsonwebtoken'


const authDoctor=async(req,res,next)=>{
    try {
        const {dtoken}=req.headers

        if (!dtoken) {
            return res.status(401).json({success:false,message:'Token not provided'})
        }
        const token_decode = jwt.verify(dtoken,process.env.JWT_SECRET)
        if (!token_decode || !token_decode.id) {
            return res.status(401).json({success:false,message:'Invalid Token'})
        }
        req.docId = token_decode.id;

        next()

    } catch (error) {
        return res.status(401).json({success:false,message:'Invalid Token'})
    }
}

export default authDoctor
const jwt = require('jsonwebtoken');

const User = require('../Model/userSchema');

const Authenticate = async (req, res, next) => {

try{
    const token = req.cooekies.jwt;
    const verifyUser = jwt.verify(token, process.env.SECRET_KEY);
    const rootUser = await User.findOne({_id:verifyUser._id, "tokens.token":token});
    if(!rootUser){
        throw new Error('User not found');
    }
    req.token = token;
    req.rootUser = rootUser;
    req.userID = rootUser._id;
    next();
}catch(err){
    res.clearCookie('jwt');
    res.status(401).send('Unauthorized: No token provided');
}
}

module.exports = Authenticate;
import jwt from 'jsonwebtoken';
import userModel from '../models/users.model.js';

export function verifyToken(req, res, next) {

    // check first, header and authorization are coming or not
    if (
        req.headers &&
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === 'JWT'
    ) {
        let token = req.headers.authorization.split(" ")[1]
        jwt.verify(token, 'gladKey', function (error, verifiedToken) {
            if (error) {
                return res.status(403).json({message: error.message})
            }

            // get the user by it's id
            userModel.findById(verifiedToken._id).then((user) => {
                req.user = user;
                next();
            }).catch((error)=> {
                return res.status(500).json({error: error.message})
            })
        })
    }
    else {
        return res.status(403).json({message: "token is not present"})
    }
}
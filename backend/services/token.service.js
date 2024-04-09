const jwt = require('jsonwebtoken'); //=> https://www.npmjs.com/package/jsonwebtoken
const bcrypt = require('bcryptjs'); //=> https://www.npmjs.com/package/bcryptjs
const response = require('../services/response.service') //Load all responce request

const verifytoken = (crud , token, res , callback) =>{
    
    try{
        decoded = jwt.verify(token, process.env.SERVER_JWT_SECRET); 
    }catch(error){
        response.Unauthorized(res)
        return callback(false)
    }

    crud.send(`SELECT * FROM utilisateur as User WHERE User.id = ? and User.EMAIL = ?`, [decoded.idUser, decoded.email], res, (results) =>{

        if(results[0]){

            const validatedPassword = bcrypt.compareSync( 
                decoded.password, 
                results[0].PASSWORD,
            );

            if(validatedPassword){
                return callback(true)
            }else{
                response.Unauthorized(res)
                return callback(false)
            }

            
        }else{
            response.Unauthorized(res)
            return callback(false)
        }
    })

    
}


module.exports = {
    verifytoken
}

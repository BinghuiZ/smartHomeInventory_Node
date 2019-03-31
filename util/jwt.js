var tokenConfig = require('../config/jwtToken');
var jwt = require('jsonwebtoken');

class JWT{
    static genToken(payload){
        return new Promise((res,rej)=>{
            jwt.sign(payload,tokenConfig.secret,tokenConfig.options,(err,token)=>{
                if(err){
                    console.log(tokenConfig);
                    console.log(err);
                    rej({msg:'error on genToken'});
                }
                else
                    res(token);
            });
        });
    }
    static verifyToken(token){
        return new Promise((res,rej)=>{
            jwt.verify(token,tokenConfig.secret,(err,decoded)=>{
                if(err)
                    rej({msg:err});
                else
                    res(decoded);
                console.log('decoded: ',decoded);
            })
        })
    }
}

module.exports = JWT;
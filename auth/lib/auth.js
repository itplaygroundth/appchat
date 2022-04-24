const bcrypt = require('bcryptjs');
const e = require('express');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(10);

module.exports = {
    create: (password) => {
        try {
            const hashedPassword = bcrypt.hashSync(password,salt);
            return hashedPassword;
        } catch(e) {
           return { message: "Error"};
        }
    },
    verify: async (password,repassword) => {
            var compare = await bcrypt.compare(password,repassword)
            return compare
    },
    token:async (token)=>{
            await jwt.verify(token, process.env.TOKEN_SECRET,function(err, decoded) {
            if (err) {
              
                err = {
                  name: 'TokenExpiredError',
                  message: 'jwt expired',
                  expiredAt: 1408621000
                }
              return err
            }else {
              return decoded
            }
          })
    },
    retoken: (username) =>{
        return jwt.sign(username, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
    },
 
}

  const User = require('../model/users.js');
  const jwt = require('jsonwebtoken')
  const signToken = (id)=> {
    return  jwt.sign({id}, process.env.JWT_SECRET,{
      expiresIn: process.env.JWT_EXPIRES_IN
  }) 
  }
  exports.signUp = async (req, res, next)=> {
    console.log(req.body)
      try {
        const newUser = await User.create(req.body)
       const token = signToken(newUser._id)
        console.log(req.body)
        res.status(200).json({
            status: 'success',
            token,
            user: newUser
        })
      }
      catch(error) {
        res.status(401).json({
            status: 'fail',
            message: error.message
        })
      }
     next()
  }

  exports.login = async(req, res, next)=> {
    const {email, password} = req.body

    //////check if there is no password///////////
    if(!email || !password) return res.status(400).json({message: "username and password not found"})

    //////////check if email and password is correct/////
    const users = await User.findOne({email}).select('+password')
    
    if(!users || !(await users.correctPassword(password, users.password))) {
        return res.status(401).json({message: 'username and password is incorrect'})
    }
////////send the token to the client

    const token = signToken(users._id)

    res.status(200).json({
      status: 'succes',
      token,
      users,
    })

next()
}

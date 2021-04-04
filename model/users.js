const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, 'please tell us your name'],
        
    },
    lastname: {
        type:String,
        required: [true, 'please tell us your name'],
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please provide a valid email']

    },
   
    photos:String,
    role : {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
   password: {
    type: String || Number,
    required: [true, 'please provide a password'],
    minlength: 5,
    select:false
   },
   passwordconfirmed: {
    type:  String || Number,
    required: [true, 'please confirm your password'],
    validate: {
        validator: function(el) {
            return el === this.password
        },
        message: 'passwords are not the same'
    }
   },
   amount: {
    type: Number,
    default: 0.0
  },
   passwordChangedAt: Date,
   passwordResetToken: String,
   PasswordResetExpires: Date,
   active: {
       type: Boolean,
       default: true,
       select: false
   }
})

userSchema.pre('save', async function(next) {
        ////////////run the function is password isnt modified///////
        if(!this.isModified('password')) return next();
        ////hash the password to make it secured///////
        this.password = await bcrypt.hash(this.password, 12)
        ///delete the password confirmed field//////////
        this.passwordconfirmed = undefined
        next()
    })

    userSchema.methods.correctPassword = async function(currentPassword, userPassword) { 

        return await bcrypt.compare(currentPassword, userPassword)
    }
    
const User =  mongoose.model('User', userSchema)


module.exports = User
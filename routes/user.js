const express = require('express')
const router = express.Router()
const {signUp} = require('../controller/auth.js')
const { login } = require('../controller/auth.js')
router.post('/signup', signUp)
router.post('/login', login)

module.exports = router
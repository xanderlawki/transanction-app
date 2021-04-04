const express = require('express')
const router = express.Router()


router.get('/', (req,res)=> {
    
    res.send('omo we dey another router')
})



module.exports = router
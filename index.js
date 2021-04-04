const express = require('express')
const bodyParser = require('body-parser')
const app = express();
const dotenv = require('dotenv')
const mongoose = require('mongoose')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json({limit: '10kb'}))
const transactionRoute = require('./routes/transaction')
const userRoute = require('./routes/user')
dotenv.config({path: './config.env'})
app.use('/transaction', transactionRoute)
app.use('/', userRoute)
app.get('/', (req, res)=> {
    res.send("hello from the server side")
})

const PORT = 3000 
console.log(process.env.DATABASE)
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(connection => console.log('DB connection is succesful'))
.catch(err => console.log(err, 'omo na error o'))
app.listen(PORT, ()=> {
    console.log(`app running on port ${ PORT}`)
})


const express = require('express')
const app = express()
const { config } = require('dotenv')
const connectDB = require('./database/mongodb.js')
const cookie = require('cookie-parser')
const cors = require('cors')

app.use(cors({
    credentials:true,
    origin:"http://127.0.0.1:5173"
}))

app.use(express.json())     //accepts data in json format
app.use(cookie())           //allows cookies

config({path:'./.env'}) 
connectDB()



const user = require('./routes/auth/auth.js')
const product = require('./routes/movies/movies.js')
const list = require('./routes/list/listroutes.js')

app.use('/',user)
app.use('/',product)
app.use('/',list)

app.get('/',(req,res)=>{
    res.send('hi')
})


module.exports = {app}
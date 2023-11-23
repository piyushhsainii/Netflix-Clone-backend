const {app}  = require('./app')

process.on("unhandledrejection",(err)=>{
    console.log(err)
})


app.listen(process.env.PORT,()=>{
    console.log(`server started on PORT ${process.env.PORT} `)
})

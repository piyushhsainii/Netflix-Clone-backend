const {app}  = require('./app')

process.on("unhandledrejection",(err)=>{
    console.log(err)
})
process.on("uncaughtException",(err)=>{
    console.log(err.message)
    process.exit(1)
})

app.listen(process.env.PORT,()=>{
    console.log(`server started on PORT ${process.env.PORT} `)
})

const app=require('express')()

const { connectDatabase } = require('./database/database')

//database connection
connectDatabase()
app.get('/',(req,res)=>{
    res.json({
        status:200,
        message:"Success"
    })
})


app.listen(3000,(req,res)=>{
    console.log('Server is running in 3000 port');
})
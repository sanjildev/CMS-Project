const express=require('express')
const app=express()

const { connectDatabase } = require('./database/database')
const Blog = require('./model/blogModel')


app.use(express.json()) //node js lai form baata aako data buja vaneko
app.use(express.urlencoded({extended:true}))


//database connection
connectDatabase()
app.get('/',(req,res)=>{
    res.json({
        status:200,
        message:"Success"
    })
})


//Get Blog API


app.get('/blogs',async(req,res)=>{
const blogs=await Blog.find()
if(blogs.length==0){
res.json({
    status:404,
    message:"empty blogs"
})    
}
else{
res.json({
    status:200,
    blogs,
    message:"all blogs fetched successfully"
})
}
})


//Single GET Blog API


app.get('/blog/:id',async(req,res)=>{
const id=req.params.id
const blog=await Blog.findById(id)
if(!blog){
res.json({
    status:404,
    message:"no blog found"
})
}
else{
res.json({
    status:200,
    blog,
    message:`${blog.title} blog fetched successfully`
})
    
}  

})
//CREATE BLOG API

app.post('/createBlog',async(req,res)=>{
    const title=req.body.title
    const subtitle=req.body.subtitle
    const description=req.body.description

    //alternative

   // const {title,subtitle,description}=req.body
    //Insert to database
    await Blog.create({
        title,
        subtitle,
        description
    })
    res.json({
        status:201,
        message:"Blog created successfully !!"
    })
})


//EDIT BLOG API


app.patch('/blog/:id',async(req,res)=>{
    const id=req.params.id
    const title=req.body.title
    const subtitle=req.body.subtitle
    const description=req.body.description

    const blog=await Blog.findByIdAndUpdate(id,{
        title,subtitle,description
    })
    if(!blog){
res.json({
    status:404,
    message:"no blog found"
})
}
else{
res.json({
    status:200,
    blog,
    message:`${blog.title} blog updated successfully`
})
    
}  
})



//DELETE BLOG API

app.delete('/deleteblog/:id',async(req,res)=>{
    const id=req.params.id
    await Blog.findByIdAndDelete(id)
    res.json({
        message:'Blog delete successfully!!'
    })
})
app.listen(3000,(req,res)=>{
    console.log('Server is running in 3000 port');
})
const mongoose=require('mongoose')
exports.connectDatabase=async()=>{
    //connecting to database

await mongoose.connect('mongodb+srv://sanjilCMS:Hikaripet123@cluster0.a0knaav.mongodb.net/?appName=Cluster0')
    console.log('Database conneccted successfully!!');
}
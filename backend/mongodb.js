const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/librarybackup')
.then(()=>{
    console.log('connected!')
})
.catch((error)=>{
    console.error(error)
    console.log('failled')
})

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})

const User = mongoose.model('User',userSchema)

module.exports = User
import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/LoginRegisterDB', {
 useNewUrlParser: true,
 useUnifiedTopology: true
},() => {
    console.log("DB connected")
})
app.get("/", (req, res)=>{
    res.send("MY API")
})

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    city: String,
    mobile: String,
    password: String
    
})
const User = new mongoose.model("User", userSchema)

//Routes
app.post('/login', (req, res)=>{
    const {email,password} = req.body
    User.findOne({ email: email}, (err, user)=>{
        if(user){
            if( password === user.password ){
            res.send({message: "Login Successfull", user: user})
        }else{
            res.send({ message: "Password didn't match"})
        }
    }else{
        res.send({message: "User not registred"})
        }
    })
})
app.post('/register', (req, res)=>{
    const {name,email,mobile,city,password} = req.body
    User.findOne({email: email},(err,user)=>{
        if(user){
            res.send({message: "User already Register"})
        }else{
            
            const user = new User({
                name,
                email,
                mobile,
                city,
                password
            })
            user.save( err => {
                if(err){
                    res.send(err)
                }else{
                    res.send({ message: "Successfully Register"})
                }
            })

        }
    })
})
app.listen(9003,()=>{
    console.log("BE started at Port 9003")
})
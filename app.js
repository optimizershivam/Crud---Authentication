
const express = require("express")
const {UserModel} = require("./models/User.model")
const {connection} = require ("./config")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
require("dotenv").config()
const app = express()

app.use(express.json())

app.get("/",(req,res)=> {
    return res.send('<a href="https://github.com/login/oauth/authorize?client_id=b1b0c32c6ec9b1b94b80">Login via github <a/>')
})


app.post("/signup",async (req,res)=> {
  const {email,password,age} = req.body
  await bcrypt.hash(password, 8, function(err, hash) {
    // Store hash in your password DB.
    if(err)
    {
        res.send("Signup fail")
    }

    const user = new UserModel({
        email,password:hash,age
      })
       user.save()
        res.send("Signup Sucess")
});
  
})


app.post("/login",async (req,res)=> {
  const {email,password} = req.body
  const user = await UserModel.findOne({email })
  if(!user)
  {
      return res.send("Invalid credentials")
  }
  const hashed_password = user.password

  bcrypt.compare(password, hashed_password, function(err, result) {
    if(err)
    {
        return res.send("try  again")
    }
    if(result)
    {
        const token = jwt.sign({email:email}, process.env.TOKEN_KEY,{
            expiresIn:"1h"})

        return res.send({message:"Login Successfull", token:token})
       

    }
    else
    {
        return res.send("Invalid credentilas")
    }
});

})
app.get("/auth/github", (req,res)=> {
const token = req.query.code
    res.send({message:"you are logged in", token:token})
})



app.get("/products", async(req,res)=> {
 
    const user_token = req.headers.authorization.split(" ")[1]

    jwt.verify(user_token,"secret",(err,decoded)=> {
        if(err)
        {
            return res.send("Login Again")
        }
    })
   try {
     res.send("Products Page")
   }
   catch {
    res.send("Error in Product Page")
   }
    
})

app.get("/products/mens", async(req,res)=> {
 
    const user_token = req.headers.authorization.split(" ")[1]

    jwt.verify(user_token,"secret",(err,decoded)=> {
        if(err)
        {
            return res.send("Login Again")
        }
    })

    
    try {
        res.send("Mens Page")
      }
      catch {
       res.send("Error in Product Page")
      }
})

app.get("/products/kids", async(req,res)=> {
 
    const user_token = req.headers.authorization.split(" ")[1]

    jwt.verify(user_token,"secret",(err,decoded)=> {
        if(err)
        {
            return res.send("Login Again")
        }
    })

    
    try {
        res.send("Kids Page")
      }
      catch {
       res.send("Error in Product Page")
      }
})
app.get("/cart", async(req,res)=> {
 
    const user_token = req.headers.authorization.split(" ")[1]

    jwt.verify(user_token,"secret",(err,decoded)=> {
        if(err)
        {
            return res.send("Login Again")
        }
    })

   

    try {
        res.send("Cart Page")
      }
      catch {
       res.send("Error in Product Page")
      }

})


app.listen(8080, async () => {


    try{
    await connection
    console.log("Connected to db")
    }
    catch {
        console.log("error in db")
    }
    console.log("Server started")
})

//  b1b0c32c6ec9b1b94b80
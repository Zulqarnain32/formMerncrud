// const express = require("express")
// const mongoose = require("mongoose")
// const cors = require("cors")
// const bcrypt = require("bcryptjs")
// const jwt = require("jsonwebtoken")
// const cookieParser = require("cookie-parser")

// const port =  5000;

// const app = express()
// app.use(express.json())
// app.use(cors({
//    origin : ["http://localhost:5173"],
//    methods: ["GET","POST"],
//    credentials:true
// }))
// app.use(cookieParser())
// const userModel = require('./model/userSchema')

// mongoose.connect('mongodb://127.0.0.1:27017/dashboard')
// .then(()=>{
//    console.log("connected sucessfully");
// }).catch((err)=>{
//    console.log("N0 connection" + err);
// });

// //admin dashboard
// const verifyUser = (req,res,next) => {
//    const token = req.cookies.token
//    if(!token){
//       res.json("token is missing")
//    } else {
//       jwt.verify(token,"jwt-secret-key", (err,decoded) => {
//          if(err){
//             return res.json("error with token")
//          } else {
//             if(decoded.role === "admin"){
//                res.json("Success")
//                next()
//             } else {
//                res.json("not admin")
//             }
//          }

//       })
//    }
// }
// app.get('/dashboard', verifyUser,(req,res) => {
//    res.send("admin success")
// })


// // register the user 
// app.post("/register", (req,res) => {
//    const { name,email,password } = req.body;
//    if(!name || !email || !password){
//       res.status(400).json({err:"please fill all the field"})
//    } 
//   else{
//    bcrypt.hash(password,10)
//    .then((hash) => {
//       userModel.create({name,email,password:hash})
//       .then((user) =>{
//         res.json("Success")
//       }).catch((err) => {
//         res.json(err)
//       })
//    }).catch((err) => {
//         res.json(err)
//    })
//   }

// })


// //login the user
// app.post('/login', (req,res) => {
//    const { email,password } = req.body;
//    userModel.findOne({email:email})
//    .then(user => {
//       if(user){
//         bcrypt.compare(password, user.password, (err,response) => {
//          if(response){
//            const token = jwt.sign({email: user.email, role: user.role},
//             "jwt-secret-key",{expiresIn:"1d"})
//            res.cookie('token',token)
//          //   res.json("Success bhaiya g")
//             res.json({Status:"Success",role:user.role})

//          } else {
//             return res.json("password is incorrect")
//          }
//         })
//       } else {
//          return res.json("email not found")
//       }
//    })
// })






// app.listen(port , () => {
//     console.log(`server is running at ${port} `);
// })


// using async await 
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const port = 5000;

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieParser());

const userModel = require("./model/userSchema");

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/dashboard");
    console.log("Connected successfully");
  } catch (err) {
    console.log("No connection: " + err);
  }
})();

//admin dashboard
const verifyUser = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.json("token is missing");
  } else {
    try {
      const decoded = await jwt.verify(token, "jwt-secret-key");
      if (decoded.role === "admin") {
        res.json("Success");
        next();
      } else {
        res.json("not admin");
      }
    } catch (err) {
      res.json("error with token");
    }
  }
};

app.get("/dashboard", verifyUser, (req, res) => {
  res.send("admin success");
});

// register the user
// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   if (!name || !email || !password) {
//     res.status(400).json({ err: "please fill all the field" });
//   } else {
//     try {
//       const hash = await bcrypt.hash(password, 10);
//       const user = await userModel.create({ name, email, password: hash });
//       res.json("Success");
//     } catch (err) {
//       res.json(err);
//     }
//   }
// });
// ... (previous code)

// Register the user
app.post("/register", async (req, res) => {
   const { name, email, password } = req.body;
   if (!name || !email || !password) {
     res.status(400).json({ err: "please fill all the fields" });
   } else {
     try {
       const user = await userModel.findOne({ email });
       if (user) {
         return res.json({ err: "User already exists" });
       }
 
       const hash = await bcrypt.hash(password, 10);
       await userModel.create({ name, email, password: hash });
       res.json({ status: "Success", message: "User registered successfully" });
     } catch (err) {
       res.json(err);
     }
   }
 });
 

 

//login the user
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (user) {
      const response = await bcrypt.compare(password, user.password);
      if (response) {
        const token = jwt.sign(
          { email: user.email, role: user.role },
          "jwt-secret-key",
          { expiresIn: "1d" }
        );
        res.cookie("token", token);
        res.json({ Status: "Success", role: user.role });
      } else {
        res.json("password is incorrect");
      }
    } else {
      res.json("email not found");
    }
  } catch (err) {
    res.json(err);
  }
});

app.listen(port, () => {
  console.log(`server is running at ${port}`);
});

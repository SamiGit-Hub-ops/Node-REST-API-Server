//imports or requires and boiler plate code  (1)
const express = require("express");

const app = express();

//Middle ware /plugin for getting body data in post ops   
//below 2 middleware/plugins check Content-Type Header and accordingly decode 
app.use(express.json()); 
app.use(express.urlencoded({extended: false}));


//--DB -> credential/env, connectivity, schema and model (2)

require('dotenv').config(); // its to encode db connectivity credentials   i

const mongoose = require("mongoose"); //requiring package for interacting with MongoDB  iii

//fetching env values to construct DB connection URL   iv
const dbUser = process.env.DB_USER;  //process.env is made available through line 16
const dbPassword = encodeURIComponent(process.env.DB_PASSWORD); 
const dbHost = process.env.DB_CLUSTER_HOST;
const dbName = process.env.DB_NAME; // The target database name

const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;

console.log(`Attempting to connect with URL: ${connectionString}`); 

//connection request which is a promise   v
mongoose.connect(connectionString)
        .then(() => console.log("MongoDB connected"))
        .catch((err) => console.log("MongoDB fail to connect", err.message))

//schema  vi
const userSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: true,
    },
    lastName : {
        type: String,
        
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle : {
        type: String,
    },
    gender : {
        type: String,
    },
  
}, {timestamps: true });

//model -> creating db whose reference in our code is User   vii 
const User = mongoose.model("user", userSchema); 
//user is the name of db ie table  ie collections in MongoDB (it automatically converts to plural ie users)

//--DB setup part done



//Actual code, logic for routing  (3)

//POST- Adding new resource/user in user DB  (a)

app.post("/api/users", async (req, res) => {
    /*We need to fetch whatever client/user is creating, its available as a body obj
    but for this to work we need a plugin / middleware that pushes the urlencodeddata or json data into 
    the body so we import this (app.use(express.url......)) or (app.use(express.json....))
    */
    
    const body = req.body;

    if( !body || !body.first_name || !body.last_name ||
        !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({msg: "All fields are mandatory"});
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });  
    console.log("added document in collection 'users'", result);
    return res.status(201).json({message: "success"});
});

//---Routing (b)
//ROUTES for all users -> direct html rendering

app.get("/users", async (req, res) => {
 const allDBUsers = await User.find({}) // to get all documents/rows from the collection/db
 const htmlName = `
    <ul>
        ${allDBUsers.map(user => `<li>${user.firstName} - ${user.email} </li>`).join("")}
    <ul>
 `;
 res.send(htmlName);
});


//ROUTES for all users -> but json format so that client can reproduce in suitable format (c)
app.get("/api/users", async (req, res) => {
   const allDBUsers = await User.find({});   
   return res.json(allDBUsers);   
});


//-------Custom user  (d)
// more rest api routes for user with a specific id - chaining get, put, patch & delete

app.route("/api/users/:id")
        .get( async (req, res) => {
            const user = await User.findById(req.params.id);
            
            if(!user) return res.status(404).json({error: "user not found"});
            return res.json(user);
        })

        .patch( async (req, res) => {  //assuming patch is just for firstName & email

          const updates = {
            firstName: req.body.firstName,
            email: req.body.email,
            //we can add more fields as needed
          }              
          await User.findByIdAndUpdate(req.params.id, updates, {new: true});
          if(updates) {
            return res.json({ status: "patch success" });

          }
          else {
                return res.status(404).json({ status: "error", message: "User not found for patch"});
            }
           
        })

        .put( async (req, res) => {

          const replace = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            jobTitle: req.body.jobTitle,
            gender: req.body.gender,            
          }              

          await User.findByIdAndUpdate(req.params.id, replace, {new: true});
          if(replace) {
            return res.json({ status: "replacement successful" });

          }
          else {
                return res.status(404).json({ status: "error", message: "User not found for replacement"});
            }
           
        })

        .delete( async (req, res) => {                
            const deleteUser =  await User.findByIdAndDelete(req.params.id);
            
            if(!deleteUser)  {
                return res.status(404).json({ message: "User not found for deletion" });

            }
            return res.json({ status: "deleted successfully", deletedUserId: req.params.id });
                                       
        });

//--Routing part done

//Add Server on port  (4)
const PORT = 8000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));
//requiring package for interacting with MongoDB 1
const mongoose = require("mongoose");
  
//schema  2
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
  },
  {timestamps: true },
);

//model -> creating db whose reference in our code is User  3
const User = mongoose.model("user", userSchema); 
        //user is the name of db ie table  ie collections in MongoDB 
        // (it automatically converts to plural ie users)

//export User so its available for import in index.js  4
module.exports = User;
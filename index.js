//point of entry is client  then  -> route -> controller -> model
//basic imports
const express = require("express");
const app = express();  // instance of express module-> webserver app

//importing userRouter
const userRouter = require("./routes/user");

//importing log file setup
const { logReqRes } = require("./middlewares/index");  //we could skip /index part as index file is pulled by default if no file is given

//connection
const {connectMongoDB} = require("./connection");  //importing connection setup

        //below line is to encode db connectivity credentials
        require('dotenv').config(); 

        //fetching env values to construct DB connection URL
        const dbUser = process.env.DB_USER;  //process.env is made available through "require('dotenv').config();"
        const dbPassword = encodeURIComponent(process.env.DB_PASSWORD); 
        const dbHost = process.env.DB_CLUSTER_HOST;
        const dbName = process.env.DB_NAME; // The target database name

        const connectionString = `mongodb+srv://${dbUser}:${dbPassword}@${dbHost}/${dbName}`;
 

connectMongoDB(connectionString)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log("MongoDB fail to connect", err.message));

//using middlewares
app.use(express.json()); 
app.use(express.urlencoded({extended: false})); 

//using log file setup
app.use(logReqRes('log.txt'));

//using userRouter
app.use("/api/users", userRouter);

//Add Server on port
const PORT = 8000;
app.listen(PORT, () => console.log(`Server started on Port ${PORT}`));

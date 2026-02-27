const User = require("../models/user");

async function handleGetAllUsers(req, res) {
    const allDBUsers = await User.find({});   
    return res.json(allDBUsers);   
}

async function handleGetUserById(req, res) {
    const user = await User.findById(req.params.id);            
    if(!user) return res.status(404).json({error: "user not found"});
    return res.json(user);
}

async function handleUpdateUserById(req, res) {  //assuming patch is just for firstName & email

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
           
}

async function handleReplaceUserById(req, res) {

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

}

async function handleDeleteUserById(req, res) {                
    const deleteUser =  await User.findByIdAndDelete(req.params.id);

    if(!deleteUser)  {
        return res.status(404).json({ message: "User not found for deletion" });

    }
    return res.json({ status: "deleted successfully", deletedUserId: req.params.id });
                            
}

async function handleCreateNewUser(req, res) {
   
    const body = req.body; // this body is coming from form-data or json and it has args first_name and not firstName

    if( !body || !body.first_name || !body.last_name ||
        !body.email || !body.gender || !body.job_title) {
        return res.status(400).json({msg: "All field are mandatory"});
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title,
    });  
    console.log("added document in collection 'users'", result);
    return res.status(201).json({message: "success", id: result._id});
}

module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleReplaceUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}
const express = require("express");
const router = express.Router();
const {
        handleGetAllUsers,
        handleGetUserById,
        handleUpdateUserById,
        handleReplaceUserById,
        handleDeleteUserById,
        handleCreateNewUser,

     }  = require("../controllers/user");

router.route("/")
    .get(handleGetAllUsers)
    .post(handleCreateNewUser);

router.route("/:id")
        .get(handleGetUserById)

        .patch(handleUpdateUserById)

        .put(handleReplaceUserById)

        .delete(handleDeleteUserById);

module.exports = router;